"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import { Reveal, Logo } from "@/components/ui";

type ScanType = "baseline" | "followup";

// Helper to auto-frame and zoom on the face so it occupies > 60% of the image width for YouCam API
async function optimizeFaceForYouCam(source: Blob | File | string): Promise<{ blob: Blob; dataUrl: string }> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const targetSize = 1280;
      canvas.width = targetSize;
      canvas.height = targetSize;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Canvas context failed"));

      const cropFactor = 0.65;
      const cropW = img.width * cropFactor;
      const cropH = img.height * cropFactor;
      const cropX = (img.width - cropW) / 2;
      const cropY = Math.max(0, (img.height - cropH) * 0.35);

      ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, targetSize, targetSize);

      const dataUrl = canvas.toDataURL("image/jpeg", 0.95);
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve({ blob, dataUrl });
          } else {
            reject(new Error("Blob creation failed"));
          }
        },
        "image/jpeg",
        0.95
      );
    };
    img.onerror = () => reject(new Error("Failed to load image"));

    if (typeof source === "string") {
      img.src = source;
    } else {
      img.src = URL.createObjectURL(source);
    }
  });
}

export function ScanClient({ scanType }: { scanType: ScanType }) {
  const router = useRouter();
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [permissionDenied, setPermissionDenied] = useState<boolean>(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "preview" | "uploading" | "analyzing" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [analysisStep, setAnalysisStep] = useState<string>("Initializing YouCam Skin AI...");

  // Clear any polling interval on unmount
  useEffect(() => {
    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = null;
      }
    };
  }, []);

  // Camera start function
  const startCamera = useCallback(async () => {
    setError(null);
    setPermissionDenied(false);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError("Camera is not supported on this device/browser.");
        return;
      }

      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      const userStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280, min: 640 },
          height: { ideal: 960, min: 480 },
        },
        audio: false,
      });

      setStream(userStream);
      setCameraActive(true);

      if (videoRef.current) {
        videoRef.current.srcObject = userStream;
        await videoRef.current.play().catch((err) => console.warn("Video play error:", err));
      }
    } catch (err) {
      console.warn("Camera access error:", err);
      setCameraActive(false);
      setPermissionDenied(true);
    }
  }, [stream]);

  // Start camera on mount
  useEffect(() => {
    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Update video element when stream is ready
  useEffect(() => {
    if (videoRef.current && stream && !capturedImage) {
      videoRef.current.srcObject = stream;
    }
  }, [stream, capturedImage]);

  // Handle capturing still photo directly from camera stream
  async function handleCaptureFromCamera() {
    if (!videoRef.current) {
      setError("Camera is not active. Please enable camera or upload a photo.");
      return;
    }

    const video = videoRef.current;
    if (video.videoWidth === 0 || video.videoHeight === 0) {
      setError("Camera video feed is still initializing. Please wait a moment.");
      return;
    }

    const canvas = canvasRef.current || document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setError("Could not capture frame.");
      return;
    }

    // Mirror image horizontally to match selfie view
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      async (rawBlob) => {
        if (!rawBlob) {
          setError("Failed to capture image frame.");
          return;
        }

        try {
          // Auto-frame for YouCam requirement
          const { blob: optimizedBlob, dataUrl } = await optimizeFaceForYouCam(rawBlob);
          setCapturedImage(dataUrl);
          setStatus("preview");
          await processPhotoBlob(optimizedBlob);
        } catch {
          const rawDataUrl = canvas.toDataURL("image/jpeg", 0.95);
          setCapturedImage(rawDataUrl);
          setStatus("preview");
          await processPhotoBlob(rawBlob);
        }
      },
      "image/jpeg",
      0.95
    );
  }

  // Handle file upload selection with auto-framing
  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (JPG or PNG).");
      return;
    }

    try {
      setStatus("preview");
      setAnalysisStep("Auto-framing photo for Skin AI...");
      const { blob: optimizedBlob, dataUrl } = await optimizeFaceForYouCam(file);
      setCapturedImage(dataUrl);
      await processPhotoBlob(optimizedBlob);
    } catch (err) {
      console.warn("Auto-frame error, using original file:", err);
      const reader = new FileReader();
      reader.onload = async (event) => {
        const dataUrl = event.target?.result as string;
        setCapturedImage(dataUrl);
        setStatus("preview");
        await processPhotoBlob(file);
      };
      reader.readAsDataURL(file);
    }
  }

  // Handle Retake Photo
  function handleRetake() {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
    setCapturedImage(null);
    setStatus("idle");
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    startCamera();
  }

  // Process photo blob with real YouCam API
  async function processPhotoBlob(imageBlob: Blob) {
    setStatus("uploading");
    setError(null);
    setAnalysisStep("Requesting YouCam upload slot...");

    try {
      // Step 1: Request upload slot
      const slotRes = await fetch("/api/youcam/upload-slot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contentType: "image/jpeg",
          fileName: "scan.jpg",
          fileSize: imageBlob.size || 500000,
        }),
      });

      if (!slotRes.ok) {
        const slotErr = await slotRes.json().catch(() => ({}));
        throw new Error(slotErr.error || "Could not initialize upload slot with YouCam API.");
      }

      const slotData = await slotRes.json();
      const fileId = slotData.fileId;
      const uploadUrl = slotData.upload?.url || slotData.uploadUrl;
      const uploadHeaders = slotData.upload?.headers || { "Content-Type": "image/jpeg" };

      // Step 2: Upload photo to YouCam
      setAnalysisStep("Uploading photo securely to YouCam...");
      let uploadSuccess = false;

      if (uploadUrl) {
        try {
          const directUpload = await fetch(uploadUrl, {
            method: "PUT",
            headers: uploadHeaders,
            body: imageBlob,
          });
          if (directUpload.ok) {
            uploadSuccess = true;
          }
        } catch {
          console.warn("Direct upload blocked by CORS, falling back to relay endpoint...");
        }
      }

      if (!uploadSuccess) {
        const formData = new FormData();
        formData.append("file", imageBlob, "scan.jpg");
        formData.append("fileId", fileId);
        formData.append("uploadUrl", uploadUrl || "");
        formData.append("method", "PUT");
        formData.append("headers", JSON.stringify(uploadHeaders));

        const relayRes = await fetch("/api/youcam/relay-upload", {
          method: "POST",
          body: formData,
        });

        if (!relayRes.ok) {
          const relayErr = await relayRes.json().catch(() => ({}));
          throw new Error(relayErr.error || "Failed to upload image file to YouCam servers.");
        }
      }

      // Step 3: Start Skin AI Scan Task
      setStatus("analyzing");
      setAnalysisStep("Running YouCam AI Skin Analysis v2.1...");

      const startRes = await fetch("/api/scans/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileId,
          scanType,
        }),
      });

      if (!startRes.ok) {
        const errData = await startRes.json();
        throw new Error(errData.error || "Failed to start skin analysis task.");
      }

      const startData = await startRes.json();
      const scanId = startData.scanId;

      // Step 4: Poll for results
      await pollScanStatus(scanId);
    } catch (err: unknown) {
      console.error("Scan error:", err);
      setStatus("error");
      setError(err instanceof Error ? err.message : "An unexpected error occurred during scan.");
    }
  }

  // Poll scan status until complete
  async function pollScanStatus(scanId: string) {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
    }

    let attempts = 0;
    const maxAttempts = 35;

    pollIntervalRef.current = setInterval(async () => {
      attempts++;
      setAnalysisStep(`Measuring skin attributes with YouCam AI (${attempts}s)...`);

      try {
        const statusRes = await fetch(`/api/scans/${scanId}/status`);
        const statusData = await statusRes.json().catch(() => ({}));

        if (statusRes.ok && statusData.status === "success") {
          if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
          setAnalysisStep("Analysis complete! Redirecting...");
          setTimeout(() => {
            router.push(statusData.next);
          }, 600);
          return;
        }

        if (!statusRes.ok || statusData.status === "error") {
          if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
          setStatus("error");
          setError(statusData.error || "YouCam Skin Analysis failed. Please retake photo with clear lighting.");
          return;
        }
      } catch (err) {
        console.warn("Poll status error:", err);
      }

      if (attempts >= maxAttempts) {
        if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
        setStatus("error");
        setError("Scan processing timed out. Please click Retake Photo and try again.");
      }
    }, 2000);
  }

  return (
    <div className="min-h-screen pb-24 pt-6 px-4 sm:px-6 bg-[#FAF8F5]">
      {/* Hidden File Input for Device Photo Upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/jpg"
        onChange={handleFileSelect}
        className="hidden"
      />
      <canvas ref={canvasRef} className="hidden" />

      {/* Top Floating Capsule Navbar */}
      <header className="max-w-[580px] mx-auto mb-12 sm:mb-16">
        <div className="bg-white/95 backdrop-blur-md border border-[#E9E4DC] shadow-[0_4px_24px_rgba(0,0,0,0.05)] rounded-full px-5 py-2.5 flex items-center justify-between">
          <Link href="/" className="hover:opacity-90 transition-opacity">
            <Logo />
          </Link>

          <nav className="flex items-center gap-6 text-[13.5px] font-medium text-[#52525B]">
            <Link href="/#how" className="hover:text-[#18181B] transition-colors">
              How it works
            </Link>
            <Link href="/demo" className="hover:text-[#18181B] transition-colors">
              Demo
            </Link>
          </nav>

          <Link
            href="/start"
            className="bg-[#5B4FE8] hover:bg-[#4E42DC] text-white text-xs font-semibold px-4 py-2 rounded-full shadow-[0_2px_10px_rgba(91,79,232,0.28)] transition-all"
          >
            Start a Proof Review
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-[760px] mx-auto">
        {/* Heading */}
        <Reveal className="text-center mb-8 sm:mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.035em] text-[#18181B]">
            {scanType === "baseline" ? "Let’s get a clean baseline." : "Time for your follow-up."}
          </h1>
          <p className="font-serif italic text-xl sm:text-2xl text-[#71717A] mt-3">
            {scanType === "baseline"
              ? "Position your face in the guides for an accurate scan."
              : "Use the same scan quality to measure what changed."}
          </p>
        </Reveal>

        {/* Scan Grid Container */}
        <Reveal delay={0.05}>
          <div className="grid grid-cols-1 md:grid-cols-[340px_1fr] gap-6 items-start">
            {/* Left Column: Camera Viewfinder */}
            <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden bg-[#18181B] shadow-lg flex items-center justify-center border border-[#ECE8E1]">
              {/* Day badge */}
              <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-lg bg-white/85 backdrop-blur-md text-[#18181B] text-xs font-bold flex items-center gap-1.5 shadow-sm">
                <span>📅</span> {scanType === "baseline" ? "Day 1" : "Day 21"}
              </div>

              {/* Real Live Video Element or Captured Still */}
              {capturedImage ? (
                <img
                  src={capturedImage}
                  alt="Captured Scan Frame"
                  className="w-full h-full object-cover"
                />
              ) : cameraActive ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover scale-x-[-1]"
                />
              ) : (
                /* Permission Prompt or Loading */
                <div className="absolute inset-0 bg-[#18181B] flex flex-col items-center justify-center p-6 text-center z-10">
                  <div className="w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center text-xl mb-3">
                    📷
                  </div>
                  <p className="text-white text-sm font-bold mb-1">
                    Camera Access
                  </p>
                  <p className="text-white/70 text-xs mb-4 max-w-[220px]">
                    Allow camera access or upload an unedited raw selfie.
                  </p>
                  <div className="flex flex-col gap-2 w-full max-w-[200px]">
                    <button
                      type="button"
                      onClick={startCamera}
                      className="w-full py-2 px-3 rounded-xl bg-[#5B4FE8] hover:bg-[#4E42DC] text-white text-xs font-bold shadow-md transition-all cursor-pointer"
                    >
                      Enable Camera
                    </button>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-2 px-3 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-all cursor-pointer"
                    >
                      Upload Raw Photo
                    </button>
                  </div>
                </div>
              )}

              {/* Overlaid Face Framing HUD */}
              {!capturedImage && (
                <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between z-10">
                  {/* Top corner brackets */}
                  <div className="flex justify-between items-start">
                    <div className="w-8 h-8 border-t-2 border-l-2 border-white/90 rounded-tl-xl" />
                    <div className="w-8 h-8 border-t-2 border-r-2 border-white/90 rounded-tr-xl" />
                  </div>

                  {/* Centered Oval Face Guide Outline with Dashes and Vertical Line */}
                  <div className="absolute inset-x-8 inset-y-8 flex items-center justify-center">
                    <div className="relative w-[84%] h-[92%] rounded-[50%] border-2 border-dashed border-white/80">
                      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px border-l border-dashed border-white/60" />
                    </div>
                  </div>

                  {/* Bottom corner brackets */}
                  <div className="flex justify-between items-end">
                    <div className="w-8 h-8 border-b-2 border-l-2 border-white/90 rounded-bl-xl" />
                    <div className="w-8 h-8 border-b-2 border-r-2 border-white/90 rounded-br-xl" />
                  </div>
                </div>
              )}

              {/* Floating Pill at Bottom */}
              <div className="absolute bottom-5 z-20 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-medium">
                {capturedImage ? "Photo auto-framed for AI" : "Position your face in the guides"}
              </div>

              {/* Loading Overlay when processing */}
              {(status === "uploading" || status === "analyzing") && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-30">
                  <div className="w-10 h-10 border-3 border-white/20 border-t-[#5B4FE8] rounded-full animate-spin mb-4" />
                  <p className="text-white text-sm font-bold mb-1">
                    {status === "uploading" ? "Uploading Scan..." : "Analyzing with YouCam Skin AI..."}
                  </p>
                  <p className="text-white/70 text-xs font-mono">{analysisStep}</p>
                </div>
              )}
            </div>

            {/* Right Column: Conditions & Trial Status */}
            <div className="space-y-4">
              {/* Box 1: Checklist & Photo Quality Notice */}
              <div className="bg-white rounded-3xl p-6 border border-[#EBE7E0] shadow-sm">
                <h2 className="text-base font-bold text-[#18181B]">
                  Follow the scan conditions.
                </h2>
                <p className="text-xs text-[#71717A] mt-1 mb-4">
                  Consistency helps Pruv detect real skin changes accurately.
                </p>

                {/* Important Photo Quality Warning */}
                <div className="p-3.5 rounded-2xl bg-[#FFF7ED] border border-[#FFEDD5] text-xs text-[#9A3412] mb-4 space-y-1">
                  <p className="font-bold flex items-center gap-1.5 text-xs text-[#C2410C]">
                    <span>⚠️</span> Important Photo Guidelines:
                  </p>
                  <p className="text-[11px] leading-relaxed text-[#7C2D12]">
                    Use a <strong>raw, unedited, close-up portrait</strong> without makeup, beauty filters, or smoothing. Filtered images will distort the AI measurements.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#F4F1FC] text-[#5B4FE8] flex items-center justify-center flex-shrink-0">
                      ☀️
                    </div>
                    <div>
                      <h3 className="font-bold text-xs text-[#18181B]">Natural, even lighting</h3>
                      <p className="text-[11px] text-[#71717A]">Avoid heavy shadows or harsh direct flash.</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#F4F1FC] text-[#5B4FE8] flex items-center justify-center flex-shrink-0">
                      😐
                    </div>
                    <div>
                      <h3 className="font-bold text-xs text-[#18181B]">Neutral expression</h3>
                      <p className="text-[11px] text-[#71717A]">Face forward looking straight at the lens.</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#F4F1FC] text-[#5B4FE8] flex items-center justify-center flex-shrink-0">
                      👤
                    </div>
                    <div>
                      <h3 className="font-bold text-xs text-[#18181B]">Centered close-up</h3>
                      <p className="text-[11px] text-[#71717A]">Face should fill the major portion of the frame.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Box 2: Trial Progress Checklist */}
              <div className="bg-white rounded-3xl p-5 border border-[#EBE7E0] shadow-sm space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#DCFCE7] text-[#16A34A] text-xs font-bold flex items-center justify-center flex-shrink-0">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-[#18181B]">Baseline completed ✓</h3>
                    <p className="text-[11px] text-[#71717A]">Day 1</p>
                  </div>
                </div>

                <div className="w-full border-t border-[#F0EDF6]" />

                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#F4F1FC] text-[#5B4FE8] text-xs flex items-center justify-center flex-shrink-0">
                    📅
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-[#18181B]">
                      {scanType === "baseline" ? "Now capture Day 1" : "Now capture Day 21"}
                    </h3>
                    <p className="text-[11px] text-[#71717A]">Let&apos;s see what changed.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Error message */}
        {error && (
          <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-700 text-center shadow-sm">
            <p className="font-bold text-sm mb-1">Scan Notice</p>
            <p>{error}</p>
          </div>
        )}

        {/* Action Buttons */}
        <Reveal delay={0.1} className="mt-8 text-center flex flex-col items-center gap-3">
          {capturedImage || status === "error" ? (
            /* Retake Button */
            <div className="w-full max-w-[340px] flex flex-col gap-2.5">
              <button
                type="button"
                onClick={handleRetake}
                className="w-full py-3.5 px-6 rounded-xl border border-[#EBE7E0] bg-white hover:bg-[#FAF9F6] text-[#18181B] font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>↺</span> Retake / Choose Another Photo
              </button>
            </div>
          ) : (
            /* Camera Capture & Upload Buttons */
            <div className="w-full max-w-[340px] flex flex-col gap-3">
              <button
                type="button"
                disabled={!cameraActive || status === "uploading" || status === "analyzing"}
                onClick={handleCaptureFromCamera}
                className="w-full py-4 px-6 rounded-xl bg-[#5B4FE8] hover:bg-[#4E42DC] active:scale-[0.98] disabled:opacity-50 text-white font-bold text-sm sm:text-base shadow-[0_6px_20px_rgba(91,79,232,0.32)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>📷</span>
                {scanType === "baseline" ? "Capture Baseline Scan" : "Capture Follow-up Scan"}
              </button>

              <button
                type="button"
                disabled={status === "uploading" || status === "analyzing"}
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-3 px-6 rounded-xl border border-[#EBE7E0] bg-white hover:bg-[#FAF9F6] text-[#18181B] font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>📁</span> Upload Photo from Device
              </button>
            </div>
          )}

          <p className="text-xs text-[#71717A] mt-1 font-normal">
            Pruv will compare this with your baseline using YouCam Skin AI.
          </p>
        </Reveal>
      </main>
    </div>
  );
}
