import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Profile
  await prisma.profile.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      fullName: "John Doe",
      headline: "Full-Stack Developer",
      summary:
        "Passionate developer with experience building modern web applications. I love clean code, great UX, and solving complex problems.",
      location: "San Francisco, CA",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      linkedinUrl: "https://linkedin.com/in/johndoe",
      githubUrl: "https://github.com/johndoe",
    },
  });

  // About
  await prisma.about.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      content: `## About Me

I'm a full-stack developer with over 5 years of experience building web applications. My journey in tech started with a curiosity about how things work on the internet, and it has evolved into a deep passion for creating elegant, performant, and user-friendly software.

### What I Do

I specialize in building modern web applications using React, Next.js, and Node.js. I'm passionate about creating intuitive user interfaces and robust backend systems.

### Beyond Code

When I'm not coding, you'll find me exploring hiking trails, reading about new technologies, or contributing to open-source projects. I believe in continuous learning and sharing knowledge with the community.`,
    },
  });

  // Experiences
  const experiences = [
    {
      id: "exp1",
      company: "TechCorp Inc.",
      roleTitle: "Senior Full-Stack Developer",
      location: "San Francisco, CA",
      startDate: new Date("2022-01-01"),
      endDate: null,
      employmentType: "Full-time",
      description: "Leading the development of the company's flagship SaaS product.",
      highlights: [
        "Led a team of 5 developers to rebuild the frontend using Next.js, improving page load times by 40%",
        "Designed and implemented a microservices architecture handling 10M+ requests/day",
        "Introduced CI/CD pipelines reducing deployment time from hours to minutes",
      ],
      techTags: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
      order: 0,
    },
    {
      id: "exp2",
      company: "StartupXYZ",
      roleTitle: "Full-Stack Developer",
      location: "Remote",
      startDate: new Date("2020-03-01"),
      endDate: new Date("2021-12-31"),
      employmentType: "Full-time",
      description: "Built and maintained multiple client-facing web applications.",
      highlights: [
        "Developed a real-time collaboration tool used by 50K+ users",
        "Built RESTful APIs and GraphQL endpoints for mobile and web clients",
        "Implemented authentication and authorization using OAuth 2.0",
      ],
      techTags: ["React", "Node.js", "GraphQL", "MongoDB", "Docker"],
      order: 1,
    },
    {
      id: "exp3",
      company: "WebAgency Co.",
      roleTitle: "Junior Developer",
      location: "New York, NY",
      startDate: new Date("2018-06-01"),
      endDate: new Date("2020-02-28"),
      employmentType: "Full-time",
      description: "Worked on various client projects ranging from e-commerce to SaaS platforms.",
      highlights: [
        "Built responsive websites for 20+ clients using React and Vue.js",
        "Optimized database queries reducing response times by 60%",
        "Mentored 3 interns on web development best practices",
      ],
      techTags: ["React", "Vue.js", "PHP", "MySQL", "CSS"],
      order: 2,
    },
  ];

  for (const exp of experiences) {
    await prisma.experience.upsert({
      where: { id: exp.id },
      update: {},
      create: exp,
    });
  }

  // Skill Categories & Skills
  const categories = [
    {
      id: "cat1",
      name: "Frontend",
      order: 0,
      skills: [
        { name: "React / Next.js", level: 5 },
        { name: "TypeScript", level: 5 },
        { name: "Tailwind CSS", level: 4 },
        { name: "Framer Motion", level: 3 },
        { name: "Vue.js", level: 3 },
      ],
    },
    {
      id: "cat2",
      name: "Backend",
      order: 1,
      skills: [
        { name: "Node.js", level: 5 },
        { name: "Python", level: 3 },
        { name: "PostgreSQL", level: 4 },
        { name: "GraphQL", level: 4 },
        { name: "REST APIs", level: 5 },
      ],
    },
    {
      id: "cat3",
      name: "DevOps & Tools",
      order: 2,
      skills: [
        { name: "Docker", level: 4 },
        { name: "AWS", level: 3 },
        { name: "Git", level: 5 },
        { name: "CI/CD", level: 4 },
        { name: "Linux", level: 4 },
      ],
    },
  ];

  for (const cat of categories) {
    await prisma.skillCategory.upsert({
      where: { id: cat.id },
      update: {},
      create: {
        id: cat.id,
        name: cat.name,
        order: cat.order,
      },
    });

    for (let i = 0; i < cat.skills.length; i++) {
      const skill = cat.skills[i];
      const skillId = `${cat.id}-skill${i}`;
      await prisma.skill.upsert({
        where: { id: skillId },
        update: {},
        create: {
          id: skillId,
          categoryId: cat.id,
          name: skill.name,
          level: skill.level,
          tags: [],
          order: i,
        },
      });
    }
  }

  // Projects
  const projects = [
    {
      id: "proj1",
      slug: "ecommerce-platform",
      title: "E-Commerce Platform",
      shortDescription: "A full-featured e-commerce platform with real-time inventory management.",
      content: `## Overview

Built a modern e-commerce platform from scratch, handling everything from product catalog to payment processing.

## Key Features

- **Product Management**: Admin dashboard for managing products, categories, and inventory
- **Shopping Cart**: Real-time cart with persistent storage
- **Payment Processing**: Stripe integration with webhook handling
- **Order Tracking**: Real-time order status updates

## Technical Highlights

The platform handles 1000+ concurrent users with sub-200ms response times, thanks to careful optimization of database queries and strategic caching.`,
      techTags: ["Next.js", "Stripe", "PostgreSQL", "Redis", "Tailwind CSS"],
      repoUrl: "https://github.com/johndoe/ecommerce",
      liveUrl: "https://shop.example.com",
      featured: true,
      order: 0,
    },
    {
      id: "proj2",
      slug: "task-management-app",
      title: "Task Management App",
      shortDescription: "A collaborative task management tool with real-time updates and team features.",
      content: `## Overview

A Trello-like task management application with real-time collaboration features.

## Key Features

- **Drag & Drop**: Intuitive board management with drag-and-drop columns and cards
- **Real-time Sync**: Changes appear instantly for all team members
- **Comments & Attachments**: Rich commenting system with file uploads
- **Notifications**: Email and in-app notifications for task updates

## Architecture

Built with a WebSocket-based real-time layer on top of a REST API, ensuring both reliability and instant updates.`,
      techTags: ["React", "Node.js", "Socket.io", "MongoDB", "Docker"],
      repoUrl: "https://github.com/johndoe/taskmanager",
      featured: true,
      order: 1,
    },
    {
      id: "proj3",
      slug: "weather-dashboard",
      title: "Weather Dashboard",
      shortDescription: "Beautiful weather dashboard with location-based forecasts and data visualization.",
      content: `## Overview

A clean, data-rich weather dashboard that provides detailed forecasts and historical weather data.

## Key Features

- **Location Search**: Search any city worldwide for weather data
- **7-Day Forecast**: Detailed daily and hourly forecasts
- **Data Visualization**: Beautiful charts for temperature, humidity, and wind data
- **PWA**: Installable as a progressive web app with offline support`,
      techTags: ["React", "D3.js", "OpenWeather API", "PWA"],
      repoUrl: "https://github.com/johndoe/weather",
      liveUrl: "https://weather.example.com",
      featured: true,
      order: 2,
    },
  ];

  for (const proj of projects) {
    await prisma.project.upsert({
      where: { id: proj.id },
      update: {},
      create: proj,
    });
  }

  // Site Settings
  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      siteTitle: "John Doe | Full-Stack Developer",
      siteDescription:
        "Professional portfolio of John Doe - Full-Stack Developer specializing in React, Next.js, and Node.js.",
    },
  });

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
