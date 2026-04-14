import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import Signup from "./pages/Signup";
import Professors from "./pages/Professors";
import Colleges from "./pages/Colleges";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:courseCode" element={<CourseDetails />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/professors" element={<Professors />} />
        <Route path="/colleges" element={<Colleges />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;