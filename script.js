// Get all the elements we need from the page
const generateBtn = document.getElementById("generate");
const topicInput = document.getElementById("topic");
const outputSection = document.getElementById("output-section");
const outputTextarea = document.getElementById("blog-output");
const copyBtn = document.getElementById("copy-button");
const downloadBtn = document.getElementById("download-button");
const spinner = document.getElementById("spinner");

// When the Generate button is clicked
generateBtn.addEventListener("click", async function() {
  // Get the topic from the input field
  const topic = topicInput.value.trim();
  
  // Check if the topic is empty
  if (!topic) {
    alert("Please enter a topic first!");
    return;
  }
  
  // Show loading spinner
  generateBtn.disabled = true;
  spinner.classList.remove("hidden");
  
  // Simulate waiting for AI (1-3 seconds)
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  // Generate the blog content
  const blogContent = generateBlogContent(topic);
  
  // Show the generated blog
  outputTextarea.value = blogContent;
  outputSection.classList.remove("hidden");
  
  // Hide loading spinner
  generateBtn.disabled = false;
  spinner.classList.add("hidden");
});

// Function to create the blog content
function generateBlogContent(topic) {
  // Possible introductions
  const intros = [
    `Today we're going to talk about ${topic}. This is an important topic because...`,
    `Have you ever wondered about ${topic}? In this post, we'll explore...`,
    `${topic} is becoming more popular every day. Here's what you need to know...`
  ];
  
  // Possible middle sections
  const sections = [
    `## What is ${topic}?\n\n${topic} is basically... The main things to know are:\n- First thing\n- Second thing\n- Third thing`,
    `## Why ${topic} Matters\n\nThere are several reasons why ${topic} is important:\n1. Reason one\n2. Reason two\n3. Reason three`,
    `## How to Use ${topic}\n\nIf you want to work with ${topic}, follow these steps:\n\nStep 1: Start with...\nStep 2: Then you should...\nStep 3: Finally...`
  ];
  
  // Possible conclusions
  const conclusions = [
    `As you can see, ${topic} is really interesting. I hope this helps you understand it better!`,
    `Now you know more about ${topic}. Try using this knowledge in your own projects!`,
    `That's our look at ${topic}. Remember, the most important thing is...`
  ];
  
  // Pick random parts for our blog
  const randomIntro = intros[Math.floor(Math.random() * intros.length)];
  const randomSection = sections[Math.floor(Math.random() * sections.length)];
  const randomConclusion = conclusions[Math.floor(Math.random() * conclusions.length)];
  
  // Put it all together
  return `# ${topic}\n\n${randomIntro}\n\n${randomSection}\n\n${randomConclusion}\n\n*Note: This is simulated content. A real AI would generate more detailed text.*`;
}

// Copy button functionality
copyBtn.addEventListener("click", function() {
  // Select the text in the textarea
  outputTextarea.select();
  // Copy it to clipboard
  document.execCommand("copy");
  // Show feedback
  copyBtn.textContent = "Copied!";
  setTimeout(() => {
    copyBtn.textContent = "Copy";
  }, 2000);
});

// Download button functionality
downloadBtn.addEventListener("click", function() {
  // Create a file with the blog content
  const content = outputTextarea.value;
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  
  // Create a temporary link to download the file
  const a = document.createElement("a");
  a.href = url;
  a.download = `blog_about_${topicInput.value || "topic"}.txt`;
  document.body.appendChild(a);
  a.click();
  
  // Clean up
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});

// Allow pressing Enter to generate
topicInput.addEventListener("keyup", function(e) {
  if (e.key === "Enter") {
    generateBtn.click();
  }
});