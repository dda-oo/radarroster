---
layout: default
title: RadarRoster - Data Science & Analytics Services
description: Data Science, Business Intelligence, AI, and Data Engineering services by Daryoosh Dehestani.
---

# Welcome to RadarRoster

Hi, I’m **Daryoosh Dehestani** — a freelance data enthusiast specializing in Business Intelligence, Data Science, Analytics, AI development, and Data Engineering.

Feel free to explore my professional profiles:  
[LinkedIn](https://www.linkedin.com/in/daryooshdehestani/) | [GitHub](https://github.com/dda-oo)

---

## What I Offer

I provide comprehensive services across the data and analytics lifecycle, including but not limited to:

- **Data Science & Machine Learning:** predictive modeling, supervised & unsupervised learning, deep learning, natural language processing (NLP), time series analysis  
- **Business Intelligence (BI):** dashboard development, data visualization, KPI reporting, data storytelling  
- **Data Engineering:** ETL pipelines, data warehousing, data lake architecture, data integration, cloud data platforms (GCP, AWS, Azure)  
- **AI Development:** building AI-powered applications, chatbots, recommendation systems, automation workflows  
- **Analytics & Insights:** exploratory data analysis, statistical modeling, hypothesis testing, customer & market segmentation  
- **Consulting & Training:** data strategy, analytics maturity assessment, upskilling teams in Python, SQL, BI tools, and more  

---

## Get in Touch

I’m always open to discussing new projects, collaborations, or questions.

You can reach me via email:  
<span>email [at] radarroster [dot] com</span>  

<form id="contact-form" action="https://formsubmit.co/dehestani@radarroster.com" method="POST">
  <input type="hidden" name="_captcha" value="false">
  <input type="text" name="_honey" style="display:none">

  <label for="name">Name:</label><br>
  <input type="text" id="name" name="name" required><br><br>

  <label for="email">Email:</label><br>
  <input type="email" id="email" name="email" required><br><br>

  <label for="message">Message:</label><br>
  <textarea id="message" name="message" rows="6" required></textarea><br><br>

  <button type="submit">Send</button>
</form>

<div id="form-status" style="margin-top: 1rem; font-weight: bold;"></div>

<script>
document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  fetch(form.action, {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' }
  }).then(response => {
    if (response.ok) {
      form.reset();
      document.getElementById('form-status').textContent = "Thanks for your message! I will get back to you shortly.";
    } else {
      document.getElementById('form-status').textContent = "Oops! There was a problem submitting your form.";
    }
  }).catch(() => {
    document.getElementById('form-status').textContent = "Oops! There was a problem submitting your form.";
  });
});
</script>

---

Thanks for stopping by! I look forward to helping you unlock the power of your data.
