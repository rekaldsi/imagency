'use client'

import { useState, useRef, useEffect } from 'react'

const VOICE_SCRIPT = `"The quick brown fox jumps over the lazy dog. She sells seashells by the seashore. How much wood would a woodchuck chuck if a woodchuck could chuck wood? Peter Piper picked a peck of pickled peppers. The rain in Spain stays mainly in the plain."`

interface AudioRecorderProps {
  script?: string
  onRecordingComplete?: (blob: Blob) => void
}

export default function AudioRecorder({ onRecordingComplete }: AudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [hasRecording, setHasRecording] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [duration, setDuration] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (audioUrl) URL.revokeObjectURL(audioUrl)
    }
  }, [audioUrl])

  const startRecording = async () => {
    try {
      setError(null)
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data)
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        const url = URL.createObjectURL(blob)
        setAudioUrl(url)
        setHasRecording(true)
        onRecordingComplete?.(blob)
        stream.getTracks().forEach((t) => t.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
      setDuration(0)

      timerRef.current = setInterval(() => {
        setDuration((d) => d + 1)
      }, 1000)
    } catch {
      setError('Could not access microphone. Please allow microphone access and try again.')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }

  const formatDuration = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

  return (
    <div className="space-y-6">
      {/* Script */}
      <div className="bg-warm-cream rounded-xl p-6 border border-warm-border">
        <div className="text-xs font-semibold text-charcoal-muted uppercase tracking-widest mb-3">Please read aloud:</div>
        <p className="text-charcoal leading-relaxed text-sm italic">{VOICE_SCRIPT}</p>
      </div>

      {/* Recording Controls */}
      <div className="flex flex-col items-center gap-4">
        {isRecording ? (
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-sm text-charcoal font-medium">Recording — {formatDuration(duration)}</span>
            </div>
            <button
              type="button"
              onClick={stopRecording}
              className="px-6 py-3 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 transition-colors"
            >
              Stop Recording
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={startRecording}
            className="flex items-center gap-3 px-8 py-4 bg-charcoal text-warm-white font-semibold rounded-full hover:bg-charcoal/90 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5z"/>
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
            </svg>
            Start Recording
          </button>
        )}

        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
            {error}
          </div>
        )}
      </div>

      {/* Playback */}
      {hasRecording && audioUrl && (
        <div className="bg-white rounded-xl border border-warm-border p-4">
          <div className="text-xs font-medium text-charcoal-muted mb-3 uppercase tracking-wide">Preview your recording</div>
          <audio controls src={audioUrl} className="w-full" />
          <button
            type="button"
            onClick={() => { setHasRecording(false); setAudioUrl(null); setDuration(0) }}
            className="mt-3 text-sm text-charcoal-muted hover:text-charcoal transition-colors"
          >
            Re-record
          </button>
        </div>
      )}

      {/* Upload existing */}
      <div className="text-center">
        <div className="text-xs text-charcoal-muted mb-2">Or upload an existing audio file</div>
        <label className="cursor-pointer inline-flex items-center gap-2 text-sm text-charcoal-muted border border-warm-border px-4 py-2 rounded-full hover:bg-warm-cream transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Upload Audio (MP3, WAV, M4A)
          <input type="file" accept="audio/*" className="sr-only" onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) {
              const url = URL.createObjectURL(file)
              setAudioUrl(url)
              setHasRecording(true)
            }
          }} />
        </label>
      </div>
    </div>
  )
}
