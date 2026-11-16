import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [feedback, setFeedback] = useState({});

  const [intrebare, setIntrebare] = useState('');
  const [optiuneA, setOptiuneA] = useState('');
  const [optiuneB, setOptiuneB] = useState('');
  const [optiuneC, setOptiuneC] = useState('');
  const [optiuneD, setOptiuneD] = useState('');
  const [raspunsCorect, setRaspunsCorect] = useState('');
  const [domeniu, setDomeniu] = useState('Geografie');

  const API_URL = 'http://localhost:8080/api/quizzes';

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setQuizzes(data);
    } catch (error) {
      console.error('Eroare la preluarea intrebarilor:', error);
    }
  };

  const handleSelect = (quizId, option) => {
    setSelectedAnswers({ ...selectedAnswers, [quizId]: option });
  };

  const verifyAnswer = (quizId, correctOption) => {
    const userChoice = selectedAnswers[quizId];
    if (!userChoice) {
      setFeedback({ ...feedback, [quizId]: { text: 'Selecteaza o varianta!', color: '#b85d34' } });
      return;
    }
    if (userChoice.toUpperCase() === correctOption.toUpperCase()) {
      setFeedback({ ...feedback, [quizId]: { text: 'Corect!', color: '#557a46' } });
    } else {
      setFeedback({ ...feedback, [quizId]: { text: `Gresit! Varianta corecta era: ${correctOption}`, color: '#a63a2b' } });
    }
  };

  const handleAddQuiz = async (e) => {
    e.preventDefault();
    if (!intrebare || !optiuneA || !raspunsCorect) {
      alert('Completeaza cel putin intrebarea, prima optiune si raspunsul corect!');
      return;
    }

    const newQuiz = { intrebare, optiuneA, optiuneB, optiuneC, optiuneD, raspunsCorect: raspunsCorect.toUpperCase(), domeniu };

    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newQuiz)
    });

    setIntrebare('');
    setOptiuneA('');
    setOptiuneB('');
    setOptiuneC('');
    setOptiuneD('');
    setRaspunsCorect('');
    fetchQuizzes();
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchQuizzes();
  };

  return (
      <div style={{ maxWidth: '850px', margin: '40px auto', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', padding: '0 20px', color: '#3d322c' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ color: '#5c4033', fontSize: '2.2rem', marginBottom: '8px' }}>Geografie - Teste Grila</h1>
        </div>

        <div style={{ background: '#fdfbf7', border: '1px solid #e6ded3', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(92, 64, 51, 0.05)', marginBottom: '30px' }}>
          {quizzes.map((q, index) => (
              <div key={q.id} style={{ borderBottom: '1px solid #eee5d8', padding: '20px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ background: '#e3d7cb', color: '#4a3b32', padding: '3px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>{q.domeniu}</span>
                  <button onClick={() => handleDelete(q.id)} style={{ background: '#a63a2b', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>Sterge</button>
                </div>

                <p style={{ fontSize: '1.05rem', fontWeight: '600', color: '#2c221e', margin: '10px 0' }}>{index + 1}. {q.intrebare}</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '15px 0' }}>
                  {['A', 'B', 'C', 'D'].map((opt) => {
                    const textOpt = q[`optiune${opt}`];
                    if (!textOpt) return null;
                    return (
                        <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f4efe6', padding: '10px 14px', borderRadius: '8px', cursor: 'pointer', border: '1px solid #e8decf' }}>
                          <input type="radio" name={`q-${q.id}`} onChange={() => handleSelect(q.id, opt)} style={{ accentColor: '#8c5840' }} />
                          <span style={{ fontWeight: '600', color: '#5c4033' }}>{opt})</span> {textOpt}
                        </label>
                    );
                  })}
                </div>

                <button onClick={() => verifyAnswer(q.id, q.raspunsCorect)} style={{ marginTop: '5px', background: '#8c5840', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>Verifica Raspunsul</button>

                {feedback[q.id] && <p style={{ fontWeight: 'bold', color: feedback[q.id].color, marginTop: '10px', fontSize: '0.95rem' }}>{feedback[q.id].text}</p>}
              </div>
          ))}
        </div>

        <div style={{ background: '#fdfbf7', border: '1px solid #e6ded3', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(92, 64, 51, 0.05)' }}>
          <h3 style={{ color: '#5c4033', borderBottom: '2px solid #e6ded3', paddingBottom: '10px', marginTop: '0' }}>Adauga o intrebare noua</h3>
          <form onSubmit={handleAddQuiz} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '15px' }}>
            <input type="text" placeholder="Text intrebare" value={intrebare} onChange={(e) => setIntrebare(e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #dcd1c1', background: '#fff' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <input type="text" placeholder="Varianta A" value={optiuneA} onChange={(e) => setOptiuneA(e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #dcd1c1', background: '#fff' }} />
              <input type="text" placeholder="Varianta B" value={optiuneB} onChange={(e) => setOptiuneB(e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #dcd1c1', background: '#fff' }} />
              <input type="text" placeholder="Varianta C" value={optiuneC} onChange={(e) => setOptiuneC(e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #dcd1c1', background: '#fff' }} />
              <input type="text" placeholder="Varianta D" value={optiuneD} onChange={(e) => setOptiuneD(e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #dcd1c1', background: '#fff' }} />
            </div>
            <input type="text" placeholder="Raspuns corect (A, B, C, D)" value={raspunsCorect} onChange={(e) => setRaspunsCorect(e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #dcd1c1', background: '#fff' }} />
            <button type="submit" style={{ background: '#557a46', color: '#fff', border: 'none', padding: '12px', fontWeight: 'bold', cursor: 'pointer', borderRadius: '6px', fontSize: '1rem', marginTop: '5px' }}>Salveaza Intrebarea</button>
          </form>
        </div>
      </div>
  );
}

export default App;