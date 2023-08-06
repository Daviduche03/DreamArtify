import FileSaver from 'file-saver';
import { surpriseMePrompts } from '../constants';

export function getRandomPrompt(prompt) {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[randomIndex];

  if (randomPrompt === prompt) return getRandomPrompt(prompt);

  return randomPrompt;
}

export async function downloadImage(_id, photo) {
  try {
    // Fetch the image data as a Blob
    const response = await fetch(photo);
    const imageBlob = await response.blob();

    // Save the Blob as a file using FileSaver
    FileSaver.saveAs(imageBlob, `download-${_id}.jpg`);
  } catch (error) {
    console.error('Error downloading and saving the image:', error);
  }
  
}

