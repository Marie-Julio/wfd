import React, { useState } from 'react';
import { UserCircle, Mail, Phone, MapPin, Building, Calendar} from 'lucide-react';

const MemberProfile = () => {
  const [isHovered, setIsHovered] = useState(false);

  const member = {
    name: "Sarah Johnson",
    role: "Senior Developer",
    email: "sarah.j@company.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    department: "Engineering",
    joinDate: "January 2023",
    bio: "Passionate developer with 5+ years of experience in full-stack development. Specialized in React and Node.js.",
    skills: ["React", "Node.js", "TypeScript", "AWS", "Docker"],
    avatar: "/api/placeholder/150/150",
    social: {
      github: "sarahj",
      linkedin: "sarahjohnson",
      twitter: "sarahj_dev"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8 transition-all duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
          {/* Header Section */}
          <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-8">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative flex flex-col md:flex-row items-center gap-6">
              <div 
                className="relative group cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <img
                  src={member.avatar}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg transform transition-transform duration-300 group-hover:scale-105"
                />
                <div className={`absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                  <span className="text-white text-sm">Update Photo</span>
                </div>
              </div>
              <div className="text-center md:text-left text-white">
                <h1 className="text-3xl font-bold">{member.name}</h1>
                <p className="text-xl opacity-90">{member.role}</p>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 sm:p-8">
            {/* Bio */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3 text-gray-800">About</h2>
              <p className="text-gray-600">{member.bio}</p>
            </div>

            {/* Skills */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3 text-gray-800">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {member.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: Mail, label: "Email", value: member.email },
                { icon: Phone, label: "Phone", value: member.phone },
                { icon: MapPin, label: "Location", value: member.location },
                { icon: Building, label: "Department", value: member.department },
                { icon: Calendar, label: "Join Date", value: member.joinDate }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <item.icon className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">{item.label}</p>
                    <p className="text-gray-900 font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            {/* <div className="mt-8 flex justify-center gap-4">
              {[
                { icon: GitHub, link: `https://github.com/${member.social.github}` },
                { icon: LinkedIn, link: `https://linkedin.com/in/${member.social.linkedin}` },
                { icon: Twitter, link: `https://twitter.com/${member.social.twitter}` }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  className="p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;