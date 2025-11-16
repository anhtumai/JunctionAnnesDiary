import { Photo } from '../types';
import { SAMPLE_PHOTOS } from '../constants/data';
import { storageService } from './storageService';

/**
 * Photo Service
 * Manages both sample photos and user-uploaded photos globally
 */

class PhotoService {
  private userPhotos: Photo[] = [];
  private initialized = false;

  /**
   * Initialize the photo service by loading user photos from storage
   */
  async initialize(): Promise<void> {
    if (this.initialized) return;
    
    try {
      this.userPhotos = await storageService.getUserPhotos();
      this.initialized = true;
    } catch (error) {
      console.error('Error initializing photo service:', error);
      this.userPhotos = [];
      this.initialized = true;
    }
  }

  /**
   * Get all photos (sample + user photos)
   */
  async getAllPhotos(): Promise<Photo[]> {
    await this.initialize();
    return [...this.userPhotos, ...SAMPLE_PHOTOS];
  }

  /**
   * Get a photo by ID from both sample and user photos
   */
  async getPhotoById(id: string): Promise<Photo | undefined> {
    await this.initialize();
    
    // First check user photos
    const userPhoto = this.userPhotos.find(photo => photo.id === id);
    if (userPhoto) {
      return userPhoto;
    }
    
    // Then check sample photos
    return SAMPLE_PHOTOS.find(photo => photo.id === id);
  }

  /**
   * Add a user photo and persist it
   */
  async addUserPhoto(photo: Photo): Promise<void> {
    await this.initialize();
    
    // Add to local cache
    const existingIndex = this.userPhotos.findIndex(p => p.id === photo.id);
    if (existingIndex >= 0) {
      this.userPhotos[existingIndex] = photo;
    } else {
      this.userPhotos.unshift(photo); // Add to beginning for recent first
    }
    
    // Persist to storage
    await storageService.saveUserPhotos(this.userPhotos);
  }

  /**
   * Remove a user photo
   */
  async removeUserPhoto(id: string): Promise<void> {
    await this.initialize();
    
    this.userPhotos = this.userPhotos.filter(photo => photo.id !== id);
    await storageService.saveUserPhotos(this.userPhotos);
  }

  /**
   * Get only user photos
   */
  async getUserPhotos(): Promise<Photo[]> {
    await this.initialize();
    return [...this.userPhotos];
  }

  /**
   * Get only sample photos
   */
  getSamplePhotos(): Photo[] {
    return SAMPLE_PHOTOS;
  }

  /**
   * Clear all user photos
   */
  async clearUserPhotos(): Promise<void> {
    this.userPhotos = [];
    await storageService.saveUserPhotos(this.userPhotos);
  }
}

export const photoService = new PhotoService();