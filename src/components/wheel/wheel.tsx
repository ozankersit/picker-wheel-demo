"use client"

import { useRef, useState, useCallback, useLayoutEffect } from "react"

interface WheelSegment {
  text: string
  color: string
  startAngle: number
  endAngle: number
}

interface WheelPickerProps {
  items: string[]
}

export default function Wheel({ items }: WheelPickerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const segmentsRef = useRef<WheelSegment[]>([])
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Sabit renkler
  const colors = [
    "#FF6B6B", // kırmızı
    "#FFEAA7", // sarı
    "#4ECDC4", // turkuaz
    "#96CEB4", // yeşil
    "#45B7D1", // mavi
    "#DDA0DD", // mor
    "#98D8C8", // açık yeşil
    "#F7DC6F", // altın
    "#BB8FCE", // lavanta
    "#85C1E9", // açık mavi
    "#F8C471", // turuncu
    "#82E0AA", // mint
    "#F1948A", // pembe
    "#D7BDE2", // lila
    "#AED6F1", // bebek mavisi
  ]

  // Segmentleri oluştur
  const createSegments = useCallback((): WheelSegment[] => {
    if (items.length === 0) return []

    const anglePerSegment = 360 / items.length
    return items.map((item, index) => ({
      text: item,
      color: colors[index % colors.length],
      startAngle: index * anglePerSegment,
      endAngle: (index + 1) * anglePerSegment,
    }))
  }, [items])

  // Çarkı çiz
  const drawWheel = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const segments = segmentsRef.current
    if (segments.length === 0) return

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 20

    // Canvas'ı temizle
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Merkezi kaydet ve döndür
    ctx.save()
    ctx.translate(centerX, centerY)
    ctx.rotate((rotation * Math.PI) / 180)

    // Segmentleri çiz
    segments.forEach((segment) => {
      const startAngle = (segment.startAngle * Math.PI) / 180
      const endAngle = (segment.endAngle * Math.PI) / 180

      // Segment çiz
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.arc(0, 0, radius, startAngle, endAngle)
      ctx.closePath()
      ctx.fillStyle = segment.color
      ctx.fill()

      // Metin ekle
      ctx.save()
      const textAngle = (startAngle + endAngle) / 2
      ctx.rotate(textAngle)
      ctx.fillStyle = "#000"
      ctx.font = "bold 14px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      const textRadius = radius * 0.65
      ctx.fillText(segment.text, textRadius, 0)
      ctx.restore()
    })

    ctx.restore()

    // Ok çiz
    ctx.beginPath()
    ctx.moveTo(centerX, 35) // Alt sivri nokta
    ctx.lineTo(centerX - 15, 15) // Sol üst
    ctx.lineTo(centerX + 15, 15) // Sağ üst
    ctx.closePath()
    ctx.fillStyle = "#FF4444"
    ctx.fill()
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 2
    ctx.stroke()
  }, [rotation])

  // Segmentleri oluştur
  useLayoutEffect(() => {
    if (items.length > 0) {
      segmentsRef.current = createSegments()
    }
  }, [items, createSegments])

  // Canvas'ı çiz
  useLayoutEffect(() => {
    drawWheel()
  }, [rotation, drawWheel, items])

  const handlePlayMusic = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('https://orangefreesounds.com/wp-content/uploads/2025/01/Spinning-prize-wheel-sound-effect.mp3');
      audioRef.current.volume = 0.3;
    }

    audioRef.current
      .play()
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handlePauseMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  // Çark döndür
  const spinWheel = () => {
    if (isSpinning || items.length === 0) return

    setIsSpinning(true)
    handlePlayMusic()

    // Rastgele döndürme
    const spins = Math.random() * 3 + 5
    const finalAngle = Math.random() * 360
    const totalRotation = spins * 360 + finalAngle

    const startRotation = rotation
    const duration = 3500
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      const easeOut = 1 - Math.pow(1 - progress, 4)
      const currentRotation = startRotation + totalRotation * easeOut

      setRotation(currentRotation)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setIsSpinning(false)
        handlePauseMusic()
      }
    }

    animate()
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-6 w-full max-w-xl">
        <canvas
          ref={canvasRef}
          width={576}
          height={576}
          className="border-4 border-gray-300 rounded-full cursor-pointer shadow-lg hover:shadow-xl transition-shadow w-full aspect-square"
          onClick={spinWheel}
        />
      </div>
    </div>
  )
}
