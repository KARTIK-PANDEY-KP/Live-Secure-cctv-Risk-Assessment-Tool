# IRVINEHACKS WINNER
# LiveSecure  

## 🚀 Inspiration  
The idea for LiveSecure stemmed from recognizing the untapped potential of live CCTV footage. Existing systems rely heavily on manual monitoring or static object detection models, limiting their ability to adapt to dynamic situations. We aimed to create an AI-powered system that transforms CCTV feeds into real-time actionable insights for individuals, businesses, and travelers—solving security, real estate, insurance, and travel safety challenges.  

## 🔍 What It Does  
LiveSecure is a versatile platform that serves multiple purposes:  

- **For Users**: Acts as a real-time security tool, detecting custom and predefined events (e.g., “masked man near a fence”) and sending instant alerts via Telegram or mobile notifications.  
- **For Businesses**: Provides risk assessments for specific areas, using live CCTV feeds within a defined radius to generate safety scores for insurance and real estate decision-making.  
- **For Travelers & General Users**: An alternative to **Citizen and LifeSafe apps**, providing **real-time safety alerts** directly from CCTV feeds—**no need for manual crime reporting before getting notified**.  
- **Entertainment**: Features a **LeBron James chatbot**, blending AI technology with interactive, user-friendly experiences.  
- **Identity Verification**: Utilizes two APIs to verify user details like address and phone number.  

## 💰 Revenue Model  
LiveSecure operates on a **dual-revenue model**, targeting both **individual users and businesses**:  

### **1️⃣ Subscription-Based Model (B2C)**  
For individual users who want **real-time security monitoring and travel safety insights**, we offer:  
- **Free Tier**: predefined alerts, access to safety insights, advanced event detection, and automated real-time notifications via Telegram.  
- **Premium Plan**: Paid subscription unlocking **location-based safety scores and real-time alerts of surroundings** via Telegram and mobile alerts.  
- **Travel & Public Safety Alternative**: Unlike **Citizen and LifeSafe**, LiveSecure **automates safety alerts directly from CCTV feeds**, eliminating the need for **manual crime reporting before receiving alerts**.  

### **2️⃣ Business & Enterprise Model (B2B)**  
For businesses, insurers, and real estate firms, we provide **risk assessment reports** based on live CCTV feeds:  
- **API Access & Licensing**: Businesses can integrate LiveSecure’s **AI-driven safety analytics** into their own platforms.  
- **Custom Enterprise Packages**: Tailored solutions for companies needing **real-time risk analysis** and **geospatial intelligence**.  
- **Insurance Partnerships**: Working with **insurance providers** to refine risk assessment models, allowing better policy pricing and fraud prevention.  

By offering both **consumer-focused safety features** and **business-grade risk intelligence**, LiveSecure ensures **sustainable revenue growth** while maximizing impact.  

## 🛠️ How We Built It  
- **Backend**: Built using an **RTMP server** to process live CCTV streams, chunking them into 30-second intervals. We utilized the **Marengo 2.7 model** to analyze these chunks and generate vector embeddings for event detection.  
- **Frontend**: Designed an intuitive dashboard for users and businesses, equipped with **interactive maps and search functionalities**.  
- **AI Model**: Enabled **natural language queries**, making event detection fully customizable without retraining.  
- **Alert System**: Integrated a **Telegram bot** to provide **real-time notifications** for detected events.  
- **Travel Assistant**: Developed a chatbot that delivers **safety scores and personalized travel itineraries** using data insights from CCTV feeds.  

## ⚡ Challenges We Ran Into  
- **Real-Time Processing**: Handling live streams efficiently while ensuring minimal latency.  
- **Accuracy**: Reducing **false positives** in event detection while maintaining high reliability.  
- **Privacy Concerns**: Ensuring **encryption and privacy compliance** for user data and CCTV feeds.  
- **Scalability**: Building a system capable of managing multiple **users, queries, and live streams** simultaneously.  
- **Dual Revenue Model**: Creating a strategy that balances **affordability with value** for both individual users and businesses.  

## 🏆 Accomplishments That We're Proud Of  
- Implemented **natural language-based detection**, allowing customizable event monitoring without retraining the AI.  
- Built a **dual-purpose platform** catering to both security and travel safety.  
- Achieved **minimal false positives** while processing real-time video streams at scale.  
- Developed an **intuitive and engaging LeBron James chatbot** to showcase AI's versatility.  
- Created a **unique revenue model** benefiting users, businesses, and insurance companies alike.  

## 📚 What We Learned  
- **Leveraging NLP** for AI solutions enhances user experience.  
- **Real-time systems** require robust backend architectures for high-volume data processing.  
- **Privacy and security** are critical for user trust, requiring compliance-focused design.  
- **Dual-use platforms** unlock new AI applications across industries.  

## 🔮 What's Next for LiveSecure  
- **Real-World Implementation**: Integrating actual CCTV feeds for production use.  
- **Enhanced Privacy**: Using **advanced encryption techniques** and **anonymization** for user data.  
- **Expansion**: Scaling the platform for **law enforcement, retail, and public safety**.  
- **Travel Features**: Adding **granular safety metrics and live updates** for more cities.  
- **Insurance Partnerships**: Collaborating with **insurance providers** to refine risk assessment algorithms.  
- **Entertainment**: Further developing **interactive chatbot features** to make AI more engaging.  

LiveSecure is paving the way for **smarter, safer, and more connected communities!**  

## 🛠️ Built With  
- **Amazon Web Services (AWS)**  
- **CSS3**  
- **HTML5**  
- **JavaScript**  
- **Next.js**  
- **Python**  
- **SQL**  
- **TypeScript**  
