// Fichier: formationService.js

export const getFormations = async () => {
  return [
    { 
      id: 1, 
      name: 'Dev-PRO 3.0', 
      price: 500000, 
      description: 'Comprehensive web development training with certificate and internship.' 
    },
    { 
      id: 2, 
      name: 'Réseau PRO', 
      price: 300000, 
      description: 'Networking and Cybersecurity training with certificate and internship. Covers systems administration, network management, and server administration.' 
    },
    { 
      id: 3, 
      name: 'HackSafe PRO', 
      price: 400000, 
      description: 'Cybersecurity training covering data protection and ethical hacking fundamentals.' 
    },
    { 
      id: 4, 
      name: 'Robocore PRO', 
      price: 350000, 
      description: 'Robotics and Connected Objects training, including Embedded Systems & IoT, Robotics & Mechatronics, AI & Automation, innovative projects, and prototyping.' 
    },
    { 
      id: 5, 
      name: 'Formation Spéciale Vacances / Préparation L1-L2', 
      price: 250000, 
      description: "Intensive preparation for L1 and L2 in Computer Science. Modules include: Algorithms, HTML, CSS, JavaScript, Programming Languages, Databases, Operating Systems, and Networks." 
    },
    { 
      id: 6, 
      name: 'Trader PRO', 
      price: 600000, 
      description: 'Professional trading course focusing on in-depth market analysis and strategy development.' 
    },
    { 
      id: 7, 
      name: 'Formation Hybride PRO 2.0 (L1)', 
      price: 450000, 
      description: 'Hybrid program for L1 students covering C++, C#, MVC & OOP, Wireshark, Databases (files, Access, MySQL), and Connected Objects (IoT).' 
    },
    { 
      id: 8, 
      name: 'Université Privée (Sensibilisation)', 
      price: 0, // Gratuit ou prix symbolique pour la sensibilisation
      description: 'Sensitization to our private university programs: Software Engineering, Systems and Network Administration, and Digital Communication & Multimedia.' 
    },
  ];
};