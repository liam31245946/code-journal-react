import { Header } from './Header';
import { EntryForm } from './EntryForm';
import { EntriesList } from './EntriesList';
import { NoEntries } from './NoEntries';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

type Entry = {
  id: number;
  title: string;
  photoUrl: string;
  notes: string;
};

function App() {
  const [entries, setEntries] = useState<Entry[]>([]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<EntriesList entries={entries} />} />

          <Route
            path="entry-form/:id?"
            element={<EntryForm entries={entries} setEntries={setEntries} />}
          />

          <Route path="*" element={<NoEntries />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

//  <>
//    <Routes>
//      <Route path="/" element={<Header />}>
//        <Route index element={<Dashboard />} />
//        <Route path="details/:itemId" element={<Details />} />
//        <Route path="about" element={<About />} />
//        <Route path="*" element={<NotFound />} />
//      </Route>
//    </Routes>
//  </>;
