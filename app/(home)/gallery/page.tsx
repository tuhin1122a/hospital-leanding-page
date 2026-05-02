import PhotoGallery from "@/components/gallery";

export default function GalleryPage() {
  return (
    <main className="pt-24 min-h-screen">
      <PhotoGallery previewOnly={false} />
    </main>
  );
}
