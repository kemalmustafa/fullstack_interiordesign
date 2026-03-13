'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  rectSortingStrategy,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type Project = {
  id: string;
  title: string;
  year: string;
  location: string;
  description: string;
  thumbnail_url: string;
  images: string[];
  order: number;
};

// --- Sıralanabilir Proje Kartı ---
function SortableProjectCard({ project, onEdit, onDelete }: { project: Project; onEdit: () => void; onDelete: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: project.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 50 : 'auto',
  } as React.CSSProperties;

  return (
    <div ref={setNodeRef} style={style}
      className="bg-white border border-[#E2D9CE] rounded-xl flex items-center gap-3 px-4 py-3 hover:border-[#C4B09A] transition-colors">
      {/* Drag Handle */}
      <div {...attributes} {...listeners} style={{ cursor: 'grab', color: '#D9CEC0', fontSize: '18px', userSelect: 'none', flexShrink: 0, touchAction: 'none' }}>
        ⠿
      </div>
      {/* Thumbnail */}
      <div style={{ width: '52px', height: '52px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, backgroundColor: '#E8DDD1' }}>
        <img src={project.thumbnail_url} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      {/* Bilgi */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: '12px', fontWeight: 300, color: '#2C2218', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '3px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {project.title}
        </p>
        <p style={{ fontSize: '11px', color: '#9C8572', fontWeight: 200 }}>{project.location} · {project.year}</p>
      </div>
      {/* Butonlar */}
      <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
        <button onClick={onEdit}
          style={{ fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', padding: '7px 12px', border: '1px solid #C4B09A', borderRadius: '4px', color: '#8B7055', background: 'none', cursor: 'pointer' }}
          className="hover:bg-[#8B7055] hover:text-white transition-all">
          Bearbeiten
        </button>
        <button onClick={onDelete}
          style={{ fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', padding: '7px 12px', border: '1px solid #E2D9CE', borderRadius: '4px', color: '#B5A08A', background: 'none', cursor: 'pointer' }}
          className="hover:bg-red-50 hover:border-red-300 hover:text-red-500 transition-all">
          Löschen
        </button>
      </div>
    </div>
  );
}

// --- Sıralanabilir Galeri Görseli ---
function SortableImage({ url, idx, onRemove }: { url: string; idx: number; onRemove: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: url + idx });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  } as React.CSSProperties;

  return (
    <div ref={setNodeRef} style={{ ...style, position: 'relative', aspectRatio: '1', borderRadius: '8px', overflow: 'hidden', border: '2px solid #E2D9CE', backgroundColor: '#E8DDD1' }}
      className="hover:border-[#C4B09A] transition-colors">
      <div {...attributes} {...listeners} style={{ position: 'absolute', inset: 0, cursor: 'grab', zIndex: 1, touchAction: 'none' }} />
      <img src={url} alt={`görsel ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      <button type="button" onClick={onRemove}
        style={{ position: 'absolute', top: '4px', right: '4px', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'rgba(44,34,24,0.75)', color: '#F7F3EE', border: 'none', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
        ×
      </button>
      <div style={{ position: 'absolute', bottom: '4px', left: '6px', fontSize: '9px', color: 'rgba(247,243,238,0.7)', zIndex: 2 }}>
        {idx + 1}
      </div>
    </div>
  );
}

// --- Ana Bileşen ---
export default function AdminPage() {
  const [tab, setTab] = useState<'liste' | 'yeni' | 'duzenle'>('liste');
  const [projects, setProjects] = useState<Project[]>([]);
  const [checking, setChecking] = useState(true);
  const [loading, setLoading] = useState(false);
  const [savingOrder, setSavingOrder] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  // Yeni proje
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [gallery, setGallery] = useState<FileList | null>(null);

  // Düzenleme
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editYear, setEditYear] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editThumbnail, setEditThumbnail] = useState<File | null>(null);
  const [editGallery, setEditGallery] = useState<FileList | null>(null);
  const [editImages, setEditImages] = useState<string[]>([]);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { window.location.href = '/admin/login'; }
      else { setChecking(false); fetchProjects(); }
    });
  }, []);

  const fetchProjects = async () => {
    const { data } = await supabase.from('projects').select('*').order('order', { ascending: true });
    if (data) setProjects(data);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/admin/login';
  };

  // Proje sıralama
  const handleProjectDragStart = (event: DragStartEvent) => {
    setActiveProjectId(event.active.id as string);
  };

  const handleProjectDragEnd = (event: DragEndEvent) => {
    setActiveProjectId(null);
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setProjects((prev) => {
      const oldIdx = prev.findIndex((p) => p.id === active.id);
      const newIdx = prev.findIndex((p) => p.id === over.id);
      return arrayMove(prev, oldIdx, newIdx);
    });
  };

  const saveProjectOrder = async () => {
    setSavingOrder(true);
    await Promise.all(projects.map((p, idx) => supabase.from('projects').update({ order: idx }).eq('id', p.id)));
    setSavingOrder(false);
    alert('Sıralama kaydedildi!');
  };

  // Galeri sıralama
  const handleImageDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setEditImages((prev) => {
      const oldIdx = prev.findIndex((_, i) => prev[i] + i === active.id);
      const newIdx = prev.findIndex((_, i) => prev[i] + i === over.id);
      return arrayMove(prev, oldIdx, newIdx);
    });
  };

  // Upload
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!thumbnail || !gallery) return alert('Lütfen tüm dosyaları seçin!');
    setLoading(true);
    try {
      const thumbPath = `thumbnails/${Date.now()}-${thumbnail.name}`;
      const { error: te } = await supabase.storage.from('portfolio').upload(thumbPath, thumbnail);
      if (te) throw te;
      const { data: td } = supabase.storage.from('portfolio').getPublicUrl(thumbPath);

      const galleryUrls: string[] = [];
      for (const file of Array.from(gallery)) {
        const path = `galleries/${Date.now()}-${file.name}`;
        const { error: ue } = await supabase.storage.from('portfolio').upload(path, file);
        if (!ue) {
          const { data: ud } = supabase.storage.from('portfolio').getPublicUrl(path);
          galleryUrls.push(ud.publicUrl);
        }
      }
      const { error: de } = await supabase.from('projects').insert([
        { title, year, location, description, thumbnail_url: td.publicUrl, images: galleryUrls, order: projects.length },
      ]);
      if (de) throw de;
      alert('Proje yüklendi!');
      setTitle(''); setYear(''); setLocation(''); setDescription('');
      setThumbnail(null); setGallery(null);
      fetchProjects(); setTab('liste');
    } catch (err: any) { alert('Hata: ' + err.message); }
    finally { setLoading(false); }
  };

  // Silme
  const confirmDelete = async () => {
    if (!deleteId) return;
    const project = projects.find((p) => p.id === deleteId);
    if (project) {
      const extractPath = (url: string) => { const m = '/portfolio/'; const i = url.indexOf(m); return i !== -1 ? url.slice(i + m.length) : null; };
      const paths = [project.thumbnail_url, ...(project.images || [])].map(extractPath).filter(Boolean) as string[];
      if (paths.length) await supabase.storage.from('portfolio').remove(paths);
    }
    const { error } = await supabase.from('projects').delete().eq('id', deleteId);
    if (error) alert('Hata: ' + error.message);
    else setProjects((prev) => prev.filter((p) => p.id !== deleteId));
    setDeleteId(null);
  };

  // Düzenleme
  const openEdit = (project: Project) => {
    setEditProject(project);
    setEditTitle(project.title);
    setEditYear(project.year);
    setEditLocation(project.location);
    setEditDescription(project.description || '');
    setEditThumbnail(null); setEditGallery(null);
    setEditImages(project.images || []);
    setTab('duzenle');
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editProject) return;
    setLoading(true);
    try {
      let thumbnailUrl = editProject.thumbnail_url;
      let galleryUrls = editImages;
      if (editThumbnail) {
        const tp = `thumbnails/${Date.now()}-${editThumbnail.name}`;
        const { error: te } = await supabase.storage.from('portfolio').upload(tp, editThumbnail);
        if (te) throw te;
        const { data: td } = supabase.storage.from('portfolio').getPublicUrl(tp);
        thumbnailUrl = td.publicUrl;
      }
      if (editGallery && editGallery.length > 0) {
        const newUrls: string[] = [];
        for (const file of Array.from(editGallery)) {
          const path = `galleries/${Date.now()}-${file.name}`;
          const { error: ue } = await supabase.storage.from('portfolio').upload(path, file);
          if (!ue) { const { data: ud } = supabase.storage.from('portfolio').getPublicUrl(path); newUrls.push(ud.publicUrl); }
        }
        galleryUrls = [...editImages, ...newUrls];
      }
      const { error } = await supabase.from('projects').update({ title: editTitle, year: editYear, location: editLocation, description: editDescription, thumbnail_url: thumbnailUrl, images: galleryUrls }).eq('id', editProject.id);
      if (error) throw error;
      alert('Proje güncellendi!');
      fetchProjects(); setTab('liste');
    } catch (err: any) { alert('Hata: ' + err.message); }
    finally { setLoading(false); }
  };

  if (checking) return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F7F3EE' }}>
      <p style={{ fontSize: '10px', letterSpacing: '0.4em', color: '#B5A08A', textTransform: 'uppercase' }}>Yükleniyor...</p>
    </div>
  );

  const inputStyle = { width: '100%', border: '1px solid #E2D9CE', borderRadius: '8px', padding: '12px 16px', fontSize: '13px', fontWeight: 200, color: '#2C2218', background: '#F7F3EE', outline: 'none', fontFamily: 'Jost, sans-serif' } as React.CSSProperties;
  const labelStyle = { fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase' as const, color: '#B5A08A', display: 'block', fontWeight: 300, marginBottom: '8px' };
  const activeProject = projects.find((p) => p.id === activeProjectId);

  return (
    <main className="min-h-screen pb-20 px-6" style={{ backgroundColor: '#F7F3EE' }}>
      <div className="max-w-2xl mx-auto pt-16 space-y-8">

        {/* Header */}
        <header style={{ backgroundColor: '#2C2218', borderRadius: '16px', padding: '32px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '24px', fontWeight: 300, letterSpacing: '0.3em', color: '#F7F3EE' }}>Admin Panel</h1>
            <p style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#8B7055', marginTop: '4px', fontStyle: 'italic' }}>{projects.length} Projekte</p>
          </div>
          <button onClick={handleLogout} style={{ fontSize: '9px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#8B7055', background: 'none', border: 'none', cursor: 'pointer' }} className="hover:text-[#F7F3EE] transition-colors">
            Abmelden
          </button>
        </header>

        {/* Sekmeler */}
        <div style={{ display: 'flex', borderBottom: '1px solid #E2D9CE', gap: '32px' }}>
          {[{ key: 'liste', label: 'Projekte' }, { key: 'yeni', label: 'Neu hinzufügen' }].map((t) => (
            <button key={t.key} onClick={() => setTab(t.key as any)}
              style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 300, paddingBottom: '12px', border: 'none', background: 'none', cursor: 'pointer', color: tab === t.key ? '#2C2218' : '#B5A08A', borderBottom: tab === t.key ? '1px solid #2C2218' : '1px solid transparent', marginBottom: '-1px' }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* LİSTE */}
        {tab === 'liste' && (
          <div className="space-y-3">
            <p style={{ fontSize: '10px', color: '#C4B09A', letterSpacing: '0.2em', textTransform: 'uppercase' }}>↕ Sıralamak için sürükleyin</p>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleProjectDragStart} onDragEnd={handleProjectDragEnd}>
              <SortableContext items={projects.map((p) => p.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-3">
                  {projects.map((project) => (
                    <SortableProjectCard key={project.id} project={project} onEdit={() => openEdit(project)} onDelete={() => setDeleteId(project.id)} />
                  ))}
                </div>
              </SortableContext>
              <DragOverlay>
                {activeProject && (
                  <div style={{ backgroundColor: 'white', border: '2px solid #C4B09A', borderRadius: '12px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px', boxShadow: '0 16px 40px rgba(44,34,24,0.15)' }}>
                    <div style={{ color: '#C4B09A', fontSize: '18px' }}>⠿</div>
                    <div style={{ width: '52px', height: '52px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                      <img src={activeProject.thumbnail_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <p style={{ fontSize: '12px', fontWeight: 300, color: '#2C2218', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{activeProject.title}</p>
                      <p style={{ fontSize: '11px', color: '#9C8572' }}>{activeProject.location} · {activeProject.year}</p>
                    </div>
                  </div>
                )}
              </DragOverlay>
            </DndContext>
            {projects.length > 0 && (
              <button onClick={saveProjectOrder} disabled={savingOrder}
                style={{ width: '100%', marginTop: '8px', padding: '13px', backgroundColor: savingOrder ? '#E2D9CE' : '#2C2218', color: '#F7F3EE', borderRadius: '8px', fontSize: '10px', letterSpacing: '0.4em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', fontFamily: 'Jost, sans-serif', fontWeight: 300 }}>
                {savingOrder ? 'Kaydediliyor...' : 'Sıralamayı Kaydet'}
              </button>
            )}
          </div>
        )}

        {/* YENİ PROJE */}
        {tab === 'yeni' && (
          <div style={{ backgroundColor: 'white', border: '1px solid #E2D9CE', borderRadius: '16px', padding: '40px' }}>
            <form onSubmit={handleUpload} className="space-y-6">
              <div><label style={labelStyle}>Projekt Name</label><input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Modern Residence" required style={inputStyle} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label style={labelStyle}>Jahr</label><input value={year} onChange={(e) => setYear(e.target.value)} placeholder="2026" style={inputStyle} /></div>
                <div><label style={labelStyle}>Standort</label><input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="İstanbul, TR" style={inputStyle} /></div>
              </div>
              <div><label style={labelStyle}>Beschreibung</label><textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Proje hikayesini anlatın..." rows={4} style={{ ...inputStyle, resize: 'none', lineHeight: 1.7 }} /></div>
              <div className="space-y-3">
                <div style={{ position: 'relative', border: '2px dashed #E2D9CE', borderRadius: '12px', padding: '24px', textAlign: 'center' }} className="hover:border-[#C4B09A] cursor-pointer transition-colors">
                  <p style={{ fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#B5A08A' }}>Titelbild</p>
                  <input type="file" accept="image/*" required onChange={(e) => setThumbnail(e.target.files?.[0] || null)} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
                  {thumbnail && <p style={{ marginTop: '8px', fontSize: '11px', color: '#8B7055' }}>✓ {thumbnail.name}</p>}
                </div>
                <div style={{ position: 'relative', border: '2px dashed #E2D9CE', borderRadius: '12px', padding: '24px', textAlign: 'center' }} className="hover:border-[#C4B09A] cursor-pointer transition-colors">
                  <p style={{ fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#B5A08A' }}>Galerie</p>
                  <input type="file" multiple accept="image/*" required onChange={(e) => setGallery(e.target.files)} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
                  {gallery && <p style={{ marginTop: '8px', fontSize: '11px', color: '#8B7055' }}>✓ {gallery.length} görsel</p>}
                </div>
              </div>
              <button type="submit" disabled={loading} style={{ width: '100%', backgroundColor: '#2C2218', color: '#F7F3EE', padding: '14px', borderRadius: '8px', fontSize: '10px', letterSpacing: '0.4em', textTransform: 'uppercase', fontWeight: 300, border: 'none', cursor: 'pointer', fontFamily: 'Jost, sans-serif', opacity: loading ? 0.5 : 1 }}>
                {loading ? 'Yükleniyor...' : 'Projekt Veröffentlichen'}
              </button>
            </form>
          </div>
        )}

        {/* DÜZENLEME */}
        {tab === 'duzenle' && editProject && (
          <div style={{ backgroundColor: 'white', border: '1px solid #E2D9CE', borderRadius: '16px', padding: '40px' }}>
            <p style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#B5A08A', marginBottom: '28px' }}>Bearbeiten — {editProject.title}</p>
            <form onSubmit={handleEdit} className="space-y-6">
              <div><label style={labelStyle}>Projekt Name</label><input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} required style={inputStyle} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label style={labelStyle}>Jahr</label><input value={editYear} onChange={(e) => setEditYear(e.target.value)} style={inputStyle} /></div>
                <div><label style={labelStyle}>Standort</label><input value={editLocation} onChange={(e) => setEditLocation(e.target.value)} style={inputStyle} /></div>
              </div>
              <div><label style={labelStyle}>Beschreibung</label><textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} rows={4} style={{ ...inputStyle, resize: 'none', lineHeight: 1.7 }} /></div>

              {/* Kapak */}
              <div>
                <label style={labelStyle}>Titelbild ändern <span style={{ color: '#D9CEC0', textTransform: 'none', letterSpacing: 0 }}>(optional)</span></label>
                <div style={{ position: 'relative', border: '2px dashed #E2D9CE', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '16px' }} className="hover:border-[#C4B09A] cursor-pointer transition-colors">
                  <img src={editProject.thumbnail_url} alt="kapak" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }} />
                  <p style={{ fontSize: '11px', color: editThumbnail ? '#8B7055' : '#B5A08A' }}>{editThumbnail ? `✓ ${editThumbnail.name}` : 'Yeni görsel için tıklayın'}</p>
                  <input type="file" accept="image/*" onChange={(e) => setEditThumbnail(e.target.files?.[0] || null)} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
                </div>
              </div>

              {/* Galeri sıralama */}
              <div>
                <label style={labelStyle}>Galerie — sürükle, × ile sil</label>
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleImageDragEnd}>
                  <SortableContext items={editImages.map((url, i) => url + i)} strategy={rectSortingStrategy}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '10px' }}>
                      {editImages.map((url, idx) => (
                        <SortableImage key={url + idx} url={url} idx={idx} onRemove={() => setEditImages((prev) => prev.filter((_, i) => i !== idx))} />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
                <div style={{ position: 'relative', border: '2px dashed #E2D9CE', borderRadius: '12px', padding: '16px', textAlign: 'center' }} className="hover:border-[#C4B09A] cursor-pointer transition-colors">
                  <p style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#B5A08A' }}>+ Neue Bilder <span style={{ color: '#D9CEC0', textTransform: 'none', letterSpacing: 0 }}>(optional)</span></p>
                  <input type="file" multiple accept="image/*" onChange={(e) => setEditGallery(e.target.files)} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
                  {editGallery && <p style={{ marginTop: '6px', fontSize: '11px', color: '#8B7055' }}>✓ {editGallery.length} yeni görsel</p>}
                </div>
              </div>

              <div className="flex gap-3">
                <button type="submit" disabled={loading} style={{ flex: 1, backgroundColor: '#2C2218', color: '#F7F3EE', padding: '14px', borderRadius: '8px', fontSize: '10px', letterSpacing: '0.4em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', fontFamily: 'Jost, sans-serif', opacity: loading ? 0.5 : 1 }}>
                  {loading ? 'Kaydediliyor...' : 'Speichern'}
                </button>
                <button type="button" onClick={() => setTab('liste')} style={{ padding: '14px 24px', borderRadius: '8px', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', border: '1px solid #E2D9CE', color: '#B5A08A', background: 'none', cursor: 'pointer', fontFamily: 'Jost, sans-serif' }}>
                  Abbrechen
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* SİLME MODALI */}
      {deleteId && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(44,34,24,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '24px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '40px', maxWidth: '360px', width: '100%', textAlign: 'center' }}>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', fontWeight: 300, color: '#2C2218', marginBottom: '12px' }}>Sicher löschen?</p>
            <p style={{ fontSize: '12px', fontWeight: 200, color: '#9C8572', marginBottom: '32px', lineHeight: 1.7 }}>Proje ve tüm görseller kalıcı olarak silinecek.</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={confirmDelete} style={{ flex: 1, backgroundColor: '#2C2218', color: '#F7F3EE', padding: '12px', borderRadius: '8px', fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', fontFamily: 'Jost, sans-serif' }}>Löschen</button>
              <button onClick={() => setDeleteId(null)} style={{ flex: 1, backgroundColor: 'transparent', color: '#B5A08A', padding: '12px', borderRadius: '8px', fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase', border: '1px solid #E2D9CE', cursor: 'pointer', fontFamily: 'Jost, sans-serif' }}>Abbrechen</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
