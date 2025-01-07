import { Route, Routes } from 'react-router-dom';
import './App.css';
import { EntriesList } from './EntriesList';
import { EntryForm } from './EntryForm';
import { Header } from './Header';
import { NoEntries } from './NoEntries';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<EntriesList />} />

          <Route path="entry-form/:id" element={<EntryForm />} />
          <Route path="entry-form" element={<EntryForm />} />

          <Route path="*" element={<NoEntries />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
