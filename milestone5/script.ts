// Get references to the form and display area
let form = document.getElementById('resume-form') as HTMLFormElement;
let resumeDisplay = document.getElementById('resume-display') as HTMLDivElement;
let sharelinkContainer = document.getElementById('share-link-container') as HTMLDivElement;
let sharelinkElement = document.getElementById('share-link') as HTMLAnchorElement;
let downloadpdfButton = document.getElementById('download-pdf') as HTMLButtonElement;

// Handle form submission
form.addEventListener('submit', (event: Event) => {
    event.preventDefault(); // prevent page reload

    // Collect input values
    let Username = (document.getElementById('username') as HTMLInputElement).value;
    let name = (document.getElementById('name') as HTMLInputElement).value
    let email = (document.getElementById('email') as HTMLInputElement).value
    let phone = (document.getElementById('phone') as HTMLInputElement).value
    let education = (document.getElementById('education') as HTMLInputElement).value
    let experience = (document.getElementById('experience') as HTMLInputElement).value
    let skills = (document.getElementById('skills') as HTMLInputElement).value

    // Save form data in localStorage with the username as the key
    let resumeData = {
        name,
        email,
        phone,
        education,
        experience,
        skills
    };
    localStorage.setItem(Username, JSON.stringify(resumeData));  // Saving the data locally

    // Generate the resume content dynamically
    const resumeHTML = `
    <h1><b>Editable Resume</b></h1>
    <h2>Personal Information</h2>
    <p><b>Name:</b><span contenteditable="true">${name}</span></p>
    <p><b>Email:</b><span contenteditable="true">${email}</span></p>
    <p><b>Phone:</b><span contenteditable="true">${phone}</span></p>

    <h2>Education</h2>
    <p contenteditable="true">${education}</p>

    <h2>Experience</h2>
    <p contenteditable="true">${experience}</p>

    <h2>Skills</h2>
    <p contenteditable="true">${skills}</p>
    `;

   // Display the generated resume
   resumeDisplay.innerHTML = resumeHTML;

   // Generate a shareable URL with the username only
   const shareableURL = `${window.location.origin}?username=${encodeURIComponent(Username)}`;

   // Display the shareable link
   sharelinkContainer.style.display = 'block';
   sharelinkElement.href = shareableURL;
   sharelinkElement.textContent = shareableURL;
});

// Handle PDF download
downloadpdfButton.addEventListener('click', () => {
   window.print(); // This will open the print dialog and allow the user to save as PDF
});

// Prefill the form based on the username in the URL
window.addEventListener('DOMContentLoaded', () => {
   const urlParams = new URLSearchParams(window.location.search);
   const username = urlParams.get('username');

   if (username) {
       // Autofill form if data is found in localStorage
       const savedResumeData = localStorage.getItem(username);

       if (savedResumeData) {
           const resumeData = JSON.parse(savedResumeData);
           (document.getElementById('username') as HTMLInputElement).value = username;
           (document.getElementById('name') as HTMLInputElement).value = resumeData.name;
           (document.getElementById('email') as HTMLInputElement).value = resumeData.email;
           (document.getElementById('phone') as HTMLInputElement).value = resumeData.phone;
           (document.getElementById('education') as HTMLTextAreaElement).value = resumeData.education;
           (document.getElementById('experience') as HTMLTextAreaElement).value = resumeData.experience;
           (document.getElementById('skills') as HTMLTextAreaElement).value = resumeData.skills;
       }
   }
});