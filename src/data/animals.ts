export interface Animal {
  id: string;
  name: {
    fr: string;
    en: string;
  };
  file: string;
  image: string;
}

export const animals: Animal[] = [
  { id: 'canard',  name: { fr: 'Canard', en: 'Duck' },  file: '/sounds/canard.mp3', image: '/images/canard.jpg' },
  { id: 'cheval', name: { fr: 'Cheval', en: 'Horse' }, file: '/sounds/cheval.mp3', image: '/images/cheval.jpg' },
  { id: 'vache',  name: { fr: 'Vache', en: 'Cow' },  file: '/sounds/vache.mp3', image: '/images/vache.jpg' },
  { id: 'mouton', name: { fr: 'Mouton', en: 'Sheep' }, file: '/sounds/mouton.mp3', image: '/images/mouton.jpg' },
  { id: 'chevre', name: { fr: 'Chèvre', en: 'Goat' }, file: '/sounds/chevre.mp3', image: '/images/chevre.jpg' },
  { id: 'elephant', name: { fr: 'Éléphant', en: 'Elephant' }, file: '/sounds/elephant.mp3', image: '/images/elephant.jpg' },
  { id: 'chat', name: { fr: 'Chat', en: 'Cat' }, file: '/sounds/chat.mp3', image: '/images/chat.jpg' },
  { id: 'chien', name: { fr: 'Chien', en: 'Dog' }, file: '/sounds/chien.mp3', image: '/images/chien.jpg' },
  { id: 'cochon', name: { fr: 'Cochon', en: 'Pig' }, file: '/sounds/cochon.mp3', image: '/images/cochon.jpg' },
  { id: 'coq', name: { fr: 'Coq', en: 'Rooster' }, file: '/sounds/coq.mp3', image: '/images/coq.jpg' },
  { id: 'poule', name: { fr: 'Poule', en: 'Chicken' }, file: '/sounds/poule.mp3', image: '/images/poule.jpg' },
  { id: 'ane', name: { fr: 'Âne', en: 'Donkey' }, file: '/sounds/ane.mp3', image: '/images/ane.jpg' },
  { id: 'grenouille', name: { fr: 'Grenouille', en: 'Frog' }, file: '/sounds/grenouille.mp3', image: '/images/grenouille.jpg' },
  { id: 'ours', name: { fr: 'Ours', en: 'Bear' }, file: '/sounds/ours.mp3', image: '/images/ours.jpg' },
  { id: 'lion', name: { fr: 'Lion', en: 'Lion' }, file: '/sounds/lion.mp3', image: '/images/lion.jpg' },
];
