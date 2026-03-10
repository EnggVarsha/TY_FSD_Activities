// Wait for DOM to fully load before running any code
document.addEventListener('DOMContentLoaded', function() {
  
  let step = 0;
  const steps = document.querySelectorAll(".step");
  const titles = ["Header", "Experience", "Education", "Skills", "Summary"];

  // Get all DOM elements
  const stepTitle = document.getElementById("stepTitle");
  const pName = document.getElementById("pName");
  const pContact = document.getElementById("pContact");
  const pSummary = document.getElementById("pSummary");
  const pExp = document.getElementById("pExp");
  const pEdu = document.getElementById("pEdu");
  const pSkills = document.getElementById("pSkills");
  const scoreResult = document.getElementById("scoreResult");
  const resume = document.getElementById("resume");
  const template = document.getElementById("template");
  const resumeHeaderContainer = document.getElementById("resumeHeaderContainer");

  // Input fields
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const location = document.getElementById("location");
  const job = document.getElementById("job");
  const experience = document.getElementById("experience");
  const degree = document.getElementById("degree");
  const college = document.getElementById("college");
  const year = document.getElementById("year");
  const skills = document.getElementById("skills");
  const summary = document.getElementById("summary");

  // Photo related elements
  const photoUpload = document.getElementById("photoUpload");
  const photoPreview = document.getElementById("photoPreview");
  let currentPhotoData = null; // Store photo data URL

  // Make functions globally accessible for onclick handlers
  window.showStep = function() {
    steps.forEach((s, i) => s.classList.toggle("active", i === step));
    stepTitle.innerText = titles[step];
  };
  
  window.nextStep = function() { 
    if (step < steps.length - 1) {
      step++; 
      update(); 
      save(); 
      window.showStep(); 
    }
  };
  
  window.prevStep = function() { 
    if (step > 0) {
      step--; 
      window.showStep(); 
    }
  };
  
  // Function to update resume preview with photo
  function updateResumePhoto() {
    // Remove existing photo if any
    const existingPhoto = document.querySelector('.resume-photo');
    if (existingPhoto) {
      existingPhoto.remove();
    }

    // Add photo if exists
    if (currentPhotoData) {
      const photoImg = document.createElement('img');
      photoImg.src = currentPhotoData;
      photoImg.alt = "Profile";
      photoImg.className = "resume-photo";
      resumeHeaderContainer.insertBefore(photoImg, resumeHeaderContainer.firstChild);
    }
  }

  // Handle photo upload
  window.handlePhotoUpload = function(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        currentPhotoData = e.target.result;
        photoPreview.src = currentPhotoData;
        updateResumePhoto();
        save();
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove photo
  window.removePhoto = function() {
    currentPhotoData = null;
    photoPreview.src = "https://via.placeholder.com/100";
    photoUpload.value = ''; // Clear file input
    updateResumePhoto();
    save();
  };

  window.update = function() {
    pName.innerText = name.value || "Your Name";
    pContact.innerText = `${email.value || "email@example.com"} | ${phone.value || "123-456-7890"} | ${location.value || "City, State"}`;
    pSummary.innerText = summary.value || "Your professional summary goes here...";
    
    // Format experience with job title
    if (job.value || experience.value) {
      pExp.innerText = (job.value ? job.value + "\n" : "") + (experience.value || "No experience added yet");
    } else {
      pExp.innerText = "Job Title\nYour experience details here";
    }
    
    // Format education
    if (degree.value || college.value || year.value) {
      let eduParts = [];
      if (degree.value) eduParts.push(degree.value);
      if (college.value) eduParts.push(college.value);
      if (year.value) eduParts.push(`(${year.value})`);
      pEdu.innerText = eduParts.join(" - ");
    } else {
      pEdu.innerText = "Degree - University (Year)";
    }

    // Format skills
    pSkills.innerHTML = "";
    if (skills.value && skills.value.trim() !== "") {
      skills.value.split(",").forEach(s => {
        if (s.trim()) {
          let li = document.createElement("li");
          li.innerText = s.trim();
          pSkills.appendChild(li);
        }
      });
    } else {
      let li = document.createElement("li");
      li.innerText = "Add your skills";
      pSkills.appendChild(li);
    }

    // Update photo in resume
    updateResumePhoto();
  };
  
  window.changeTemplate = function() {
    resume.className = "resume " + template.value;
  };
  
  window.downloadPDF = function() {
    const opt = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: 'Resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, allowTaint: true, useCORS: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(resume).save();
  };

  /* Auto save */
  function save() {
    try {
      const data = {
        name: name.value,
        email: email.value,
        phone: phone.value,
        location: location.value,
        job: job.value,
        experience: experience.value,
        degree: degree.value,
        college: college.value,
        year: year.value,
        skills: skills.value,
        summary: summary.value,
        photo: currentPhotoData // Save photo data
      };
      localStorage.setItem("resumeData", JSON.stringify(data));
    } catch (e) {
      console.error("Error saving to localStorage:", e);
    }
  }

  /* Load saved data */
  (function load() {
    try {
      let d = JSON.parse(localStorage.getItem("resumeData"));
      if (!d) return;
      
      Object.keys(d).forEach(k => {
        if (k === 'photo') {
          if (d[k]) {
            currentPhotoData = d[k];
            photoPreview.src = currentPhotoData;
          }
        } else {
          let element = document.getElementById(k);
          if (element) element.value = d[k] || "";
        }
      });
      window.update();
    } catch (e) {
      console.error("Error loading saved data:", e);
    }
  })();

  /* AI-like helpers */
  window.suggestSkills = function() {
    skills.value = "HTML, CSS, JavaScript, React, Node.js, Python, Git, MongoDB, Express, TypeScript";
    window.update();
    save();
  };
  
  window.suggestExperience = function() {
    experience.value = "• Led development of responsive web applications using modern frameworks\n• Collaborated with cross-functional teams to deliver features on time\n• Optimized application performance, resulting in 40% faster load times\n• Implemented responsive designs ensuring mobile-first approach\n• Participated in code reviews and mentored junior developers";
    window.update();
    save();
  };
  
  window.generateSummary = function() {
    let jobRole = job.value || "software developer";
    let skillList = skills.value || "various technical skills";
    let expSummary = experience.value ? "with proven experience in delivering high-quality solutions" : "eager to contribute to innovative projects";
    
    summary.value = `Motivated ${jobRole} skilled in ${skillList}, ${expSummary}. Passionate about creating efficient, scalable applications and staying current with emerging technologies. Seeking a challenging position where I can utilize my skills to drive project success and grow professionally.`;
    window.update();
    save();
  };

  /* Resume Score with feedback */
  window.scoreResume = function() {
    let score = 0;
    let feedback = [];
    let maxScore = 100;
    
    // Name check (10 points)
    if (name.value && name.value.trim() !== "" && name.value !== "Your Name") {
      score += 10;
    } else {
      feedback.push("❌ Add your full name");
    }
    
    // Contact info check (10 points)
    if (email.value && phone.value && location.value) {
      score += 10;
    } else {
      feedback.push("❌ Complete all contact fields");
    }
    
    // Summary check (20 points)
    if (summary.value && summary.value.length > 100) {
      score += 20;
    } else if (summary.value && summary.value.length > 50) {
      score += 15;
      feedback.push("⚠️ Make your summary more detailed (aim for 100+ characters)");
    } else if (summary.value) {
      score += 10;
      feedback.push("⚠️ Your summary is too short");
    } else {
      feedback.push("❌ Add a professional summary");
    }
    
    // Experience check (20 points)
    if (experience.value) {
      let bulletPoints = experience.value.split('\n').filter(b => b.trim().length > 0);
      if (bulletPoints.length >= 4) {
        score += 20;
      } else if (bulletPoints.length >= 2) {
        score += 15;
        feedback.push("⚠️ Add more bullet points to experience (aim for 4+)");
      } else if (bulletPoints.length > 0) {
        score += 10;
        feedback.push("⚠️ Add more details to your experience");
      }
    } else {
      feedback.push("❌ Add your work experience");
    }
    
    // Skills check (20 points)
    if (skills.value) {
      let skillCount = skills.value.split(',').filter(s => s.trim().length > 0).length;
      if (skillCount >= 6) {
        score += 20;
      } else if (skillCount >= 4) {
        score += 15;
        feedback.push(`⚠️ Add ${6 - skillCount} more skills for better score`);
      } else if (skillCount >= 2) {
        score += 10;
        feedback.push(`⚠️ Add at least 4-6 skills`);
      } else {
        feedback.push("❌ Add more skills");
      }
    } else {
      feedback.push("❌ Add your skills");
    }
    
    // Education check (10 points)
    if (degree.value && college.value && year.value) {
      score += 10;
    } else if (degree.value || college.value) {
      score += 5;
      feedback.push("⚠️ Complete all education fields");
    } else {
      feedback.push("❌ Add your education details");
    }
    
    // Job role check (5 bonus points)
    if (job.value && job.value.trim() !== "") {
      score += 5;
    } else {
      feedback.push("ℹ️ Add your target job role for better context");
      maxScore = 95; // Adjust max score since bonus not available
    }

    // Photo check (5 bonus points)
    if (currentPhotoData) {
      score += 5;
    } else {
      feedback.push("ℹ️ Add a profile photo to make your resume more personal");
      maxScore = 95; // Adjust max score since bonus not available
    }
    
    // Calculate percentage
    let percentage = Math.round((score / maxScore) * 100);
    
    // Add summary
    let summary = `📊 Resume Score: ${score}/${maxScore} (${percentage}%) - `;
    if (percentage >= 80) {
      summary += "Excellent! Ready to apply! 🎉";
    } else if (percentage >= 60) {
      summary += "Good, but can be improved 📈";
    } else if (percentage >= 40) {
      summary += "Needs more work 💪";
    } else {
      summary += "Start filling in your details ✍️";
    }
    
    // Display score and feedback
    scoreResult.innerHTML = `
      <strong>${summary}</strong><br><br>
      <strong>Suggestions to improve:</strong><br>
      <small>${feedback.join('<br>') || "✅ Your resume looks great! No major issues found."}</small>
    `;
    
    // Color code the score
    if (percentage >= 80) {
      scoreResult.style.backgroundColor = "#f0fdf4";
      scoreResult.style.borderLeftColor = "#16a34a";
    } else if (percentage >= 50) {
      scoreResult.style.backgroundColor = "#fefce8";
      scoreResult.style.borderLeftColor = "#eab308";
    } else {
      scoreResult.style.backgroundColor = "#fef2f2";
      scoreResult.style.borderLeftColor = "#ef4444";
    }
  };

  // Add input event listeners for auto-update and save
  const inputs = [name, email, phone, location, job, experience, degree, college, year, skills, summary];
  inputs.forEach(input => {
    if (input) {
      input.addEventListener('input', () => {
        window.update();
        save();
      });
    }
  });

  // Initialize
  window.showStep();
  window.update();

}); // End of DOMContentLoaded