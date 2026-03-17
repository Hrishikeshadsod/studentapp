import React, { useState, useEffect } from "react";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  // Auto clear messages after 3 sec
  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        setMessage("");
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, error]);

  const fetchStudents = () => {
    fetch("http://localhost:8080/students")
      .then(res => res.json())
      .then(data => setStudents(data));
  };

  const validate = () => {
    if (!name.trim()) {
      setError("Name cannot be empty");
      return false;
    }
    if (!age || isNaN(age) || age <= 0) {
      setError("Enter valid age");
      return false;
    }
    setError("");
    return true;
  };

  const addStudent = () => {
    if (!validate()) return;

    fetch("http://localhost:8080/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, age })
    }).then(() => {
      fetchStudents();
      setName("");
      setAge("");
      setMessage("Student added successfully!");
    });
  };

  const deleteStudent = (id) => {
    fetch(`http://localhost:8080/students/${id}`, {
      method: "DELETE"
    }).then(() => {
      fetchStudents();
      setMessage("Student deleted successfully!");
    });
  };

  const updateStudent = () => {
    if (!validate()) return;

    fetch(`http://localhost:8080/students/${editingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, age })
    }).then(() => {
      fetchStudents();
      setName("");
      setAge("");
      setEditingId(null);
      setMessage("Student updated successfully!");
    });
  };

  return (
    <div className="container mt-5">

      <h2 className="text-center mb-4">Student Management System</h2>

      {/* ✅ ALERTS */}
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* FORM */}
      <div className="card p-4 mb-4">
        <div className="row">
          <div className="col-md-5">
            <input
              className="form-control"
              placeholder="Enter Name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div className="col-md-5">
            <input
              className="form-control"
              placeholder="Enter Age"
              value={age}
              onChange={e => setAge(e.target.value)}
            />
          </div>

          <div className="col-md-2">
            <button
              className="btn btn-primary w-100"
              onClick={editingId ? updateStudent : addStudent}
            >
              {editingId ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <table className="table table-bordered table-striped text-center">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.age}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => {
                    setEditingId(s.id);
                    setName(s.name);
                    setAge(s.age);
                  }}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteStudent(s.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default App;