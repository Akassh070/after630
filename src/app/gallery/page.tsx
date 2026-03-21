import CommunityGallery from '@/components/CommunityGallery';
import styles from './GalleryPage.module.css';

export default function GalleryPage() {
  return (
    <>
      <main className={styles.main}>
        <CommunityGallery />
      </main>
    </>
  );
}
