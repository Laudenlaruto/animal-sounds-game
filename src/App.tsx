// src/App.tsx
import { useState, useEffect } from 'react';
import { Howl } from 'howler';
import { animals } from './data/animals';


const translations = {
  fr: {
    title: 'Devine le Cri de l\'Animal!',
    playSound: '▶️ Jouer le Son',
    correct: '🎉 Correct! 🎉',
    tryAgain: '❌ Essaie encore!'
  },
  en: {
    title: 'Guess the Animal Sound!',
    playSound: '▶️ Play Sound',
    correct: '🎉 Correct! 🎉',
    tryAgain: '❌ Try again!'
  }
};

export default function App() {
  const [answer, setAnswer] = useState(animals[0]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showWrong, setShowWrong] = useState(false);
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  const [displayedAnimals, setDisplayedAnimals] = useState<typeof animals>([]);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const [currentSound, setCurrentSound] = useState<Howl | null>(null);

  function play() {
    // Stop any currently playing sound
    if (currentSound) {
      currentSound.stop();
    }
    
    const sound = new Howl({ src: [answer.file] });
    setCurrentSound(sound);
    sound.play();
  }

  function getRandomAnimal() {
    const availableAnimals = animals.filter(animal => animal.id !== answer.id);
    if (availableAnimals.length === 0) {
      return animals[Math.floor(Math.random() * animals.length)];
    }
    return availableAnimals[Math.floor(Math.random() * availableAnimals.length)];
  }

  function generateDisplayedAnimals(correctAnimal: typeof animals[0]) {
    // Get 2 random animals that are not the correct answer
    const otherAnimals = animals.filter(animal => animal.id !== correctAnimal.id);
    const shuffledOthers = otherAnimals.sort(() => Math.random() - 0.5);
    const selectedOthers = shuffledOthers.slice(0, 2);
    
    // Combine correct answer with 2 random animals and shuffle
    const threeAnimals = [correctAnimal, ...selectedOthers];
    return threeAnimals.sort(() => Math.random() - 0.5);
  }

  // Initialize displayed animals on first load
  useState(() => {
    setDisplayedAnimals(generateDisplayedAnimals(answer));
  });

  // Update document title when language changes
  useEffect(() => {
    document.title = translations[language].title;
  }, [language]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function handleGuess(animalId: string) {
    if (animalId === answer.id) {
      // Stop any currently playing sound on success
      if (currentSound) {
        currentSound.stop();
        setCurrentSound(null);
      }
      
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        // Move to random next animal
        const nextAnimal = getRandomAnimal();
        setAnswer(nextAnimal);
        setDisplayedAnimals(generateDisplayedAnimals(nextAnimal));
        // Auto-play the next sound after 3 seconds
        setTimeout(() => {
          const nextSound = new Howl({ src: [nextAnimal.file] });
          setCurrentSound(nextSound);
          nextSound.play();
        }, 1000);
      }, 2000);
    } else {
      setShowWrong(true);
      setTimeout(() => setShowWrong(false), 1000);
    }
  }

  function toggleLanguage() {
    setLanguage(prev => prev === 'fr' ? 'en' : 'fr');
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-2 sm:p-4" style={{ minHeight: '100dvh', padding: 'clamp(4px, 1vw, 8px)' }}>
      <div className="flex flex-col items-center justify-center w-full max-w-7xl relative" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: '1280px', gap: 'clamp(8px, 2vh, 16px)', minHeight: '100dvh' }}>
        {/* Language Toggle Button */}
        <button
          onClick={toggleLanguage}
          className="absolute top-2 right-2 px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-xs font-medium"
          style={{ position: 'absolute', top: 'clamp(4px, 1vh, 8px)', right: 'clamp(4px, 1vw, 8px)', padding: '4px 8px', backgroundColor: '#e5e7eb', borderRadius: '4px', fontSize: 'clamp(10px, 2vw, 12px)', fontWeight: '500', border: 'none', cursor: 'pointer', zIndex: 10 }}
        >
          {language === 'fr' ? '🇬🇧 EN' : '🇫🇷 FR'}
        </button>

        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center" style={{ fontSize: 'clamp(1rem, 4vw + 1vh, 2rem)', margin: '0', textAlign: 'center', marginTop: 'clamp(20px, 4vh, 40px)' }}>{translations[language].title}</h1>

        {/* Success Animation */}
        {showSuccess && (
          <div 
            className="absolute inset-0 flex items-center justify-center z-10 animate-bounce"
            style={{ 
              position: 'absolute', 
              top: '0', 
              left: '0', 
              right: '0', 
              bottom: '0', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              backgroundColor: 'rgba(34, 197, 94, 0.9)',
              borderRadius: '12px',
              animation: 'bounce 0.5s ease-in-out',
              padding: '20px'
            }}
          >
            <div style={{ 
              fontSize: isDesktop ? '4rem' : 'clamp(1.5rem, 8vw, 3rem)', 
              color: 'white', 
              textAlign: 'center',
              lineHeight: '1.2',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {translations[language].correct}
            </div>
          </div>
        )}

        {/* Wrong Animation */}
        {showWrong && (
          <div 
            className="absolute inset-0 flex items-center justify-center z-10"
            style={{ 
              position: 'absolute', 
              top: '0', 
              left: '0', 
              right: '0', 
              bottom: '0', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              backgroundColor: 'rgba(239, 68, 68, 0.95)',
              borderRadius: '12px',
              padding: isDesktop ? '20px' : '10px'
            }}
          >
            <div style={{ 
              fontSize: isDesktop ? '3rem' : 'clamp(1.5rem, 10vw, 2.2rem)', 
              color: 'white', 
              textAlign: 'center',
              lineHeight: '1.1',
              fontWeight: '600',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {translations[language].tryAgain}
            </div>
          </div>
        )}

        <button
          onClick={play}
          className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
          style={{ padding: 'clamp(6px, 1.5vh, 12px) clamp(12px, 3vw, 20px)', fontSize: 'clamp(12px, 2.5vw + 0.5vh, 16px)', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
        >
          {translations[language].playSound}
        </button>

        <div 
          className="flex items-center justify-center gap-3 w-full"
          style={{ 
            display: 'flex', 
            flexDirection: isDesktop ? 'row' : 'column',
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: 'clamp(8px, 2vh, 20px)', 
            width: '100%', 
            flex: '1' 
          }}
        >
          {displayedAnimals.map(a => (
            <button
              key={a.id}
              onClick={() => handleGuess(a.id)}
              className="border rounded-lg p-3 hover:bg-gray-100 flex flex-col items-center gap-2 w-full max-w-xs sm:max-w-sm"
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                gap: 'clamp(4px, 1vh, 8px)', 
                padding: 'clamp(8px, 2vh, 16px)', 
                border: '1px solid #ccc', 
                borderRadius: '6px', 
                width: '100%',
                maxWidth: isDesktop ? 'clamp(200px, 30vw, 320px)' : 'clamp(150px, 28vw, 250px)',
                minHeight: isDesktop ? 'clamp(200px, 35vh, 350px)' : 'clamp(120px, 20vh, 200px)',
                maxHeight: isDesktop ? 'clamp(250px, 45vh, 400px)' : 'clamp(180px, 35vh, 280px)',
                justifyContent: 'center'
              }}
            >
              <img 
                src={a.image} 
                alt={a.name[language]}
                className="object-cover rounded border"
                style={{ 
                  width: isDesktop ? 'clamp(120px, 25vw, 200px)' : 'clamp(60px, 15vw + 5vh, 100px)', 
                  height: isDesktop ? 'clamp(120px, 25vw, 200px)' : 'clamp(60px, 15vw + 5vh, 100px)', 
                  objectFit: 'cover', 
                  borderRadius: '4px', 
                  border: '1px solid #ccc'
                }}
              />
              <span className="font-medium text-center" style={{ fontSize: isDesktop ? 'clamp(14px, 2vw, 20px)' : 'clamp(11px, 2.5vw + 0.5vh, 16px)', fontWeight: '500', textAlign: 'center' }}>{a.name[language]}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

