import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  SkipBack, 
  SkipForward,
  Settings,
  Download,
  Share2,
  Clock,
  User,
  FileText,
  BookOpen
} from 'lucide-react';

interface VideoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: {
    id: string;
    title: string;
    description: string;
    duration: string;
    instructor: string;
    category: string;
    thumbnail: string;
    difficulty: string;
  } | null;
}

export function VideoPlayerModal({ isOpen, onClose, video }: VideoPlayerModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(100);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const videoRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

  // Données de vidéo simulées avec chapitres et notes
  const videoData = {
    chapters: [
      { time: 0, title: "Introduction", duration: "0:00 - 2:30" },
      { time: 150, title: "Concepts de base", duration: "2:30 - 7:15" },
      { time: 435, title: "Exemples pratiques", duration: "7:15 - 12:45" },
      { time: 765, title: "Questions fréquentes", duration: "12:45 - 15:30" },
      { time: 930, title: "Conclusion", duration: "15:30 - 17:00" }
    ],
    relatedVideos: [
      {
        id: "related-1",
        title: "Recherche avancée dans les textes",
        duration: "12:30",
        instructor: "Dr. Fatima Benali",
        thumbnail: "/api/placeholder/160/90"
      },
      {
        id: "related-2", 
        title: "Utilisation des filtres juridiques",
        duration: "8:45",
        instructor: "Me. Ahmed Khelifi",
        thumbnail: "/api/placeholder/160/90"
      },
      {
        id: "related-3",
        title: "Export et partage de documents",
        duration: "15:20",
        instructor: "Mme. Sarah Mansouri",
        thumbnail: "/api/placeholder/160/90"
      }
    ],
    transcript: [
      {
        time: 0,
        speaker: "Instructeur",
        text: "Bonjour et bienvenue dans ce tutoriel sur la navigation dans la base de données juridique."
      },
      {
        time: 15,
        speaker: "Instructeur", 
        text: "Aujourd'hui, nous allons apprendre à utiliser efficacement les outils de recherche."
      },
      {
        time: 30,
        speaker: "Instructeur",
        text: "Commençons par explorer l'interface principale et ses différentes sections."
      }
    ]
  };

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1;
          return newTime >= duration ? duration : newTime;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, duration]);

  useEffect(() => {
    if (video) {
      // Convertir la durée en secondes pour la simulation
      const durationParts = video.duration.split(':');
      const totalSeconds = parseInt(durationParts[0]) * 60 + parseInt(durationParts[1]);
      setDuration(totalSeconds);
      setCurrentTime(0);
      setIsPlaying(false);
    }
  }, [video]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleSeek = (value: number[]) => {
    setCurrentTime(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    setIsMuted(value[0] === 0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleChapterClick = (time: number) => {
    setCurrentTime(time);
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
  };

  const handleDownload = () => {
    // Simulation de téléchargement
    const blob = new Blob([`Vidéo: ${video?.title}\nTranscription complète du tutoriel...`], 
                         { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${video?.title.replace(/\s+/g, '_')}_transcript.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleShare = () => {
    const shareData = {
      title: video?.title || '',
      text: `Regardez ce tutoriel: ${video?.title}`,
      url: `${window.location.origin}/video/${video?.id}`
    };
    
    if (navigator.share) {
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(shareData.url);
      alert('Lien copié dans le presse-papiers !');
    }
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (!video) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-hidden p-0">
        <div className="grid grid-cols-4 h-[90vh]">
          {/* Zone vidéo principale */}
          <div className="col-span-3 bg-black relative">
            {/* Simulation du lecteur vidéo */}
            <div 
              ref={videoRef}
              className="w-full h-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center relative"
              onMouseEnter={() => setShowControls(true)}
              onMouseLeave={() => {
                if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
                controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 3000);
              }}
            >
              {/* Thumbnail/Placeholder */}
              <div className="text-center text-white">
                <div className="w-24 h-24 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                  <Play className="w-12 h-12 ml-1" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{video.title}</h3>
                <p className="text-gray-300">Lecteur vidéo de démonstration</p>
                <p className="text-sm text-gray-400 mt-2">
                  Dans un environnement réel, la vidéo serait affichée ici
                </p>
              </div>

              {/* Contrôles vidéo */}
              {showControls && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  {/* Barre de progression */}
                  <div className="mb-4">
                    <Slider
                      value={[currentTime]}
                      max={duration}
                      step={1}
                      onValueChange={handleSeek}
                      className="w-full"
                    />
                    <div className="flex justify-between text-white text-sm mt-1">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>

                  {/* Contrôles */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setCurrentTime(Math.max(0, currentTime - 10))}
                        className="text-white hover:bg-white/20"
                      >
                        <SkipBack className="w-5 h-5" />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="lg"
                        onClick={togglePlay}
                        className="text-white hover:bg-white/20"
                      >
                        {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setCurrentTime(Math.min(duration, currentTime + 10))}
                        className="text-white hover:bg-white/20"
                      >
                        <SkipForward className="w-5 h-5" />
                      </Button>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={toggleMute}
                          className="text-white hover:bg-white/20"
                        >
                          {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </Button>
                        <div className="w-20">
                          <Slider
                            value={[isMuted ? 0 : volume]}
                            max={100}
                            step={1}
                            onValueChange={handleVolumeChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <select 
                        value={playbackSpeed} 
                        onChange={(e) => handleSpeedChange(Number(e.target.value))}
                        className="bg-white/20 text-white border border-white/30 rounded px-2 py-1 text-sm"
                      >
                        <option value={0.5}>0.5x</option>
                        <option value={0.75}>0.75x</option>
                        <option value={1}>1x</option>
                        <option value={1.25}>1.25x</option>
                        <option value={1.5}>1.5x</option>
                        <option value={2}>2x</option>
                      </select>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsFullscreen(!isFullscreen)}
                        className="text-white hover:bg-white/20"
                      >
                        <Maximize className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Panneau latéral */}
          <div className="bg-white border-l overflow-y-auto">
            <DialogHeader className="p-4 border-b">
              <DialogTitle className="text-lg">{video.title}</DialogTitle>
              <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {video.instructor}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {video.duration}
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <Badge variant="secondary">{video.category}</Badge>
                <Badge variant="outline">{video.difficulty}</Badge>
              </div>
            </DialogHeader>

            <div className="p-4 space-y-6">
              {/* Actions */}
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={handleDownload} className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger
                </Button>
                <Button size="sm" variant="outline" onClick={handleShare} className="flex-1">
                  <Share2 className="w-4 h-4 mr-2" />
                  Partager
                </Button>
              </div>

              {/* Progression */}
              <div>
                <h4 className="font-medium mb-2">Progression</h4>
                <Progress value={progress} className="mb-2" />
                <p className="text-sm text-gray-600">{Math.round(progress)}% terminé</p>
              </div>

              {/* Chapitres */}
              <div>
                <h4 className="font-medium mb-3">Chapitres</h4>
                <div className="space-y-2">
                  {videoData.chapters.map((chapter, index) => (
                    <div 
                      key={index}
                      className={`p-3 rounded-lg cursor-pointer border transition-colors ${
                        currentTime >= chapter.time && currentTime < (videoData.chapters[index + 1]?.time || duration)
                          ? 'bg-blue-50 border-blue-200' 
                          : 'hover:bg-gray-50 border-gray-200'
                      }`}
                      onClick={() => handleChapterClick(chapter.time)}
                    >
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium text-sm">{chapter.title}</h5>
                        <Badge variant="outline" className="text-xs">
                          {chapter.duration}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {video.description}
                </p>
              </div>

              {/* Transcription */}
              <div>
                <h4 className="font-medium mb-3">Transcription</h4>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {videoData.transcript.map((item, index) => (
                    <div key={index} className="text-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          {formatTime(item.time)}
                        </Badge>
                        <span className="font-medium text-gray-700">{item.speaker}</span>
                      </div>
                      <p className="text-gray-600 pl-4">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vidéos liées */}
              <div>
                <h4 className="font-medium mb-3">Vidéos liées</h4>
                <div className="space-y-3">
                  {videoData.relatedVideos.map((relatedVideo) => (
                    <div key={relatedVideo.id} className="flex gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="w-16 h-12 bg-gray-200 rounded flex items-center justify-center">
                        <Play className="w-4 h-4 text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-medium text-sm mb-1">{relatedVideo.title}</h5>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>{relatedVideo.instructor}</span>
                          <span>•</span>
                          <span>{relatedVideo.duration}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}