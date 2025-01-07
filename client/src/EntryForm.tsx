import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

type Entry = {
  id: number;
  title: string;
  photoUrl: string;
  notes: string;
};

type EntryFormProps = {
  entries: Entry[];
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
};

export function EntryForm({ entries, setEntries }: EntryFormProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>('');
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  useEffect(() => {
    if (id) {
      const editingEntry = entries.find(
        (entry) => entry.id === parseInt(id, 10)
      );
      if (editingEntry) {
        setTitle(editingEntry.title);
        setPhotoUrl(editingEntry.photoUrl);
        setNotes(editingEntry.notes);
      }
    }
  }, [id, entries]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: Entry = {
      id: id ? parseInt(id, 10) : Date.now(),
      title,
      photoUrl,
      notes,
    };
    if (id) {
      setEntries((prev) =>
        prev.map((entry) => (entry.id === parseInt(id, 10) ? newEntry : entry))
      );
    } else {
      setEntries((prev) => [newEntry, ...prev]);
    }
    navigate('/entries');
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <label htmlFor="photoUrl">Photo URL</label>
      <input
        id="photoUrl"
        type="url"
        value={photoUrl}
        onChange={(e) => setPhotoUrl(e.target.value)}
        required
      />
      <label htmlFor="notes">Notes</label>
      <textarea
        id="notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        required
      />
      <button type="submit">Save</button>
      {id && (
        <button type="button" onClick={() => navigate('/entries')}>
          Cancel
        </button>
      )}
    </form>
  );
}
