'use client';
import { useState } from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Event } from '../types/types';
const CVBuilder = () => {
    const [loading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        fatherName: '',
        phone: '',
        dob: '',
        cnic: '',
        email: '',
        gender: '',
        address: '',
        nationality: '',
        religion: '',
        maritalStatus: '',
        education: [{ degree: '', institute: '', year: '' }],
        skills: [{ skill: '' }],
        experience: [{ company: '', position: '', duration: '' }]
    });

    const handleInputChange = (e: Event) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const addEducation = () => {
        setFormData({
            ...formData,
            education: [...formData.education, { degree: '', institute: '', year: '' }]
        });
    };

    const removeEducation = (index: number) => {
        const newEducation = formData.education.filter((_, i) => i !== index);
        setFormData({ ...formData, education: newEducation });
    };

    const addSkill = () => {
        setFormData({
            ...formData,
            skills: [...formData.skills, { skill: '' }]
        });
    };

    const removeSkill = (index: number) => {
        const newSkills = formData.skills.filter((_, i) => i !== index);
        setFormData({ ...formData, skills: newSkills });
    };

    const addExperience = () => {
        setFormData({
            ...formData,
            experience: [...formData.experience, { company: '', position: '', duration: '' }]
        });
    };

    const removeExperience = (index: number) => {
        const newExperience = formData.experience.filter((_, i) => i !== index);
        setFormData({ ...formData, experience: newExperience });
    };

    const CVDocument = () => (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Watermark */}
                <View style={styles.watermark}>
                    <Text style={styles.watermarkText}>CV</Text>
                </View>

                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>{formData.name.toUpperCase() || 'YOUR NAME'}</Text>
                    <View style={styles.headerLine}></View>
                </View>

                {/* Personal Info (2-Column Layout) */}
                <View style={styles.sectionBox}>
                    <Text style={styles.subtitle}>Personal Details</Text>
                    <View style={styles.twoColumn}>
                        <View style={styles.column}>
                            <Text style={styles.text}><Text style={styles.label}>Name: </Text>{formData.name}</Text>
                            <Text style={styles.text}><Text style={styles.label}>Father: </Text>{formData.fatherName}</Text>
                            <Text style={styles.text}><Text style={styles.label}>Phone: </Text>{formData.phone}</Text>
                            <Text style={styles.text}><Text style={styles.label}>Email: </Text>{formData.email}</Text>
                            <Text style={styles.text}><Text style={styles.label}>Religion: </Text>{formData.religion}</Text>
                            <Text style={styles.text}><Text style={styles.label}>MaritalStatus: </Text>{formData.maritalStatus}</Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.text}><Text style={styles.label}>CNIC: </Text>{formData.cnic}</Text>
                            <Text style={styles.text}><Text style={styles.label}>DOB: </Text>{formData.dob}</Text>
                            <Text style={styles.text}><Text style={styles.label}>Gender: </Text>{formData.gender}</Text>
                            <Text style={styles.text}><Text style={styles.label}>Address: </Text>{formData.address}</Text>
                            <Text style={styles.text}><Text style={styles.label}>Nationality: </Text>{formData.nationality}</Text>
                        </View>
                    </View>
                </View>

                {/* Education */}
                <View style={styles.sectionBox}>
                    <Text style={styles.subtitle}>Education</Text>
                    {formData.education.map((edu, index) => (
                        <View key={index} style={styles.item}>
                            <Text style={styles.text}><Text style={styles.label}>Degree: </Text>{edu.degree}</Text>
                            <Text style={styles.text}><Text style={styles.label}>Institute: </Text>{edu.institute}</Text>
                            <Text style={styles.text}><Text style={styles.label}>Year: </Text>{edu.year}</Text>
                            {index < formData.education.length - 1 && <View style={styles.divider}></View>}
                        </View>
                    ))}
                </View>

                {/* Skills (Tag Style) */}
                <View style={styles.sectionBox}>
                    <Text style={styles.subtitle}>Skills</Text>
                    <View style={styles.skillsContainer}>
                        {formData.skills.map((skill, index) => (
                            <View key={index} style={styles.skillTag}>
                                <Text style={styles.skillText}>{skill.skill}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Experience (Only if data exists) */}
                {formData.experience.some(exp => exp.company || exp.position || exp.duration) && (
                    <View style={styles.sectionBox}>
                        <Text style={styles.subtitle}>Work Experience</Text>
                        {formData.experience.map((exp, index) => (
                            <View key={index} style={styles.item}>
                                <Text style={styles.text}><Text style={styles.label}>Company: </Text>{exp.company}</Text>
                                <Text style={styles.text}><Text style={styles.label}>Position: </Text>{exp.position}</Text>
                                <Text style={styles.text}><Text style={styles.label}>Duration: </Text>{exp.duration}</Text>
                                {index < formData.experience.length - 1 && <View style={styles.divider}></View>}
                            </View>
                        ))}
                    </View>
                )}

                {/* References */}
                <View style={styles.sectionBox}>
                    <Text style={styles.subtitle}>References</Text>
                    <Text style={styles.text}>Will be furnished upon request.</Text>
                </View>
            </Page>
        </Document>
    );

    const styles = StyleSheet.create({
        page: {
            padding: 20,
            paddingBottom: 40,
            backgroundColor: '#f9f9f9',
            position: 'relative',
            fontSize: 10,
            fontFamily: 'Helvetica',
            lineHeight: 1.4,
            height: '100%'
        },
        watermark: {
            position: 'absolute',
            top: '30%',
            left: 0,
            right: 0,
            textAlign: 'center',
            opacity: 0.05,
            transform: 'rotate(-45deg)'
        },
        watermarkText: {
            fontSize: 180,
            color: '#888',
            fontWeight: 'bold'
        },
        section: {
            marginBottom: 10,
            position: 'relative'
        },
        sectionBox: {
            marginBottom: 10,
            padding: 8,
            borderLeft: '2px solid #3b82f6',
            backgroundColor: '#fff',
            borderRadius: 3,
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            breakInside: 'avoid'
        },
        header: {
            marginBottom: 10,
            textAlign: 'center',
            pageBreakAfter: 'avoid'
        },
        headerLine: {
            height: 1,
            backgroundColor: '#3b82f6',
            margin: '5px auto',
            width: '80%'
        },
        title: {
            fontSize: 16,
            fontWeight: 'bold',
            color: '#1e3a8a',
            textTransform: 'uppercase',
            marginBottom: 5
        },
        subtitle: {
            fontSize: 12,
            fontWeight: 'bold',
            color: '#1e40af',
            marginBottom: 5,
            borderBottom: '1px solid #d1d5db',
            paddingBottom: 2,
            pageBreakAfter: 'avoid'
        },
        text: {
            fontSize: 10,
            marginBottom: 3,
            color: '#444'
        },
        label: {
            fontWeight: 'bold',
            color: '#111',
            marginRight: 3
        },
        twoColumn: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 5,
            pageBreakInside: 'avoid'
        },
        column: {
            width: '48%'
        },
        item: {
            marginBottom: 8,
            pageBreakInside: 'avoid'
        },
        divider: {
            height: 0.5,
            backgroundColor: '#e5e7eb',
            marginVertical: 5
        },
        skillsContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 4,
            marginTop: 4
        },
        skillTag: {
            backgroundColor: '#dbeafe',
            borderRadius: 8,
            paddingHorizontal: 6,
            paddingVertical: 2,
            marginRight: 4,
            marginBottom: 4
        },
        skillText: {
            fontSize: 8,
            color: '#1e40af'
        }
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-10 px-4 sm:px-6 lg:px-8 shadow-2xl">
            <div className="max-w-5xl mx-auto bg-gray-800/50 rounded-2xl shadow-xl p-8">
                <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">CV Builder</h1>
                <form className="space-y-8">
                    <div className="space-y-6 bg-gray-800/70 p-6 rounded-xl shadow-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full px-4 text-[18px] py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-transparent transition duration-300"
                            />
                            <input
                                type="text"
                                name="fatherName"
                                placeholder="Father's Name"
                                value={formData.fatherName}
                                onChange={handleInputChange}
                                className="w-full px-4 text-[18px] py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-transparent transition duration-300"
                            />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full px-4 text-[18px] py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-transparent transition duration-300"
                            />
                            <input
                                type="date"
                                name="dob"
                                placeholder="Date of Birth"
                                value={formData.dob}
                                onChange={handleInputChange}
                                className="w-full px-4 text-[18px] py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-transparent transition duration-300"
                            />
                            <input
                                type="text"
                                name="cnic"
                                placeholder="CNIC Number"
                                value={formData.cnic}
                                onChange={handleInputChange}
                                className="w-full px-4 text-[18px] py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-transparent transition duration-300"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-4 text-[18px] py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-transparent transition duration-300"
                            />

                            <div className="flex gap-6 items-center">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="male"
                                        onChange={handleInputChange}
                                        className="w-4 h-4 text-blue-500"
                                    />
                                    <span className="text-gray-300 font-semibold text-[18px]">Male</span>
                                </label>
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="female"
                                        onChange={handleInputChange}
                                        className="w-4 h-4 text-blue-500"
                                    />
                                    <span className="text-gray-300 font-semibold text-[18px]">Female</span>
                                </label>
                            </div>

                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={formData.address}
                                onChange={handleInputChange}
                                className="w-full px-4 text-[18px] py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-transparent transition duration-300"
                            />
                            <input
                                type="text"
                                name="nationality"
                                placeholder="Nationality"
                                value={formData.nationality}
                                onChange={handleInputChange}
                                className="w-full px-4 text-[18px] py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-transparent transition duration-300"
                            />
                            <input
                                type="text"
                                name="religion"
                                placeholder="Religion"
                                value={formData.religion}
                                onChange={handleInputChange}
                                className="w-full px-4 text-[18px] py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-transparent transition duration-300"
                            />
                            <select
                                name="maritalStatus"
                                value={formData.maritalStatus}
                                onChange={handleInputChange}
                                className="w-full px-4 text-[18px] py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-1 focus:ring-blue-500 focus:border-transparent transition duration-300"
                            >
                                <option value="" className="text-gray-300 font-semibold text-[18px]">Select Marital Status</option>
                                <option value="single" className="text-gray-300 font-semibold text-[18px]">Single</option>
                                <option value="married" className="text-gray-300 font-semibold text-[18px]">Married</option>
                            </select>
                        </div>
                    </div>

                    {/* Education Section */}
                    <div className="space-y-6 bg-gray-800/70 p-6 rounded-xl shadow-lg">
                        <h3 className="text-xl font-semibold text-gray-300">Education</h3>
                        {formData.education.map((edu, index) => (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <input
                                    type="text"
                                    placeholder="Degree"
                                    value={edu.degree}
                                    onChange={(e) => {
                                        const newEducation = [...formData.education];
                                        newEducation[index].degree = e.target.value;
                                        setFormData({ ...formData, education: newEducation });
                                    }}
                                    className="w-full px-4 text-[18px] py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-transparent transition duration-300"
                                />
                                <input
                                    type="text"
                                    placeholder="Institute"
                                    value={edu.institute}
                                    onChange={(e) => {
                                        const newEducation = [...formData.education];
                                        newEducation[index].institute = e.target.value;
                                        setFormData({ ...formData, education: newEducation });
                                    }}
                                    className="w-full px-4 text-[18px] py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-transparent transition duration-300"
                                />
                                <input
                                    type="text"
                                    placeholder="Year"
                                    value={edu.year}
                                    onChange={(e) => {
                                        const newEducation = [...formData.education];
                                        newEducation[index].year = e.target.value;
                                        setFormData({ ...formData, education: newEducation });
                                    }}
                                    className="w-full px-4 text-[18px] py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-transparent transition duration-300"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeEducation(index)}
                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-200 transform hover:scale-105"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addEducation}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-500 transform hover:scale-105"
                        >
                            Add More Education
                        </button>
                    </div>

                    {/* Skills Section */}
                    <div className="space-y-6 bg-gray-800/70 p-6 rounded-xl shadow-lg">
                        <h3 className="text-xl font-semibold text-gray-300">Skills</h3>
                        {formData.skills.map((skill, index) => (
                            <div key={index} className="flex gap-4">
                                <input
                                    type="text"
                                    placeholder="Skill"
                                    value={skill.skill}
                                    onChange={(e) => {
                                        const newSkills = [...formData.skills];
                                        newSkills[index].skill = e.target.value;
                                        setFormData({ ...formData, skills: newSkills });
                                    }}
                                    className="w-full px-4 text-[18px] py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-transparent transition duration-300"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeSkill(index)}
                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-200 transform hover:scale-105"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addSkill}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-500 transform hover:scale-105"
                        >
                            Add More Skills
                        </button>
                    </div>

                    {/* Experience Section */}
                    <div className="space-y-6 bg-gray-800/70 p-6 rounded-xl shadow-lg">
                        <h3 className="text-xl font-semibold text-gray-300">Experience</h3>
                        {formData.experience.map((exp, index) => (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <input
                                    type="text"
                                    placeholder="Company"
                                    value={exp.company}
                                    onChange={(e) => {
                                        const newExperience = [...formData.experience];
                                        newExperience[index].company = e.target.value;
                                        setFormData({ ...formData, experience: newExperience });
                                    }}
                                    className="w-full px-4 text-[18px] py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-transparent transition duration-300"
                                />
                                <input
                                    type="text"
                                    placeholder="Position"
                                    value={exp.position}
                                    onChange={(e) => {
                                        const newExperience = [...formData.experience];
                                        newExperience[index].position = e.target.value;
                                        setFormData({ ...formData, experience: newExperience });
                                    }}
                                    className="w-full px-4 text-[18px] py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-transparent transition duration-300"
                                />
                                <input
                                    type="text"
                                    placeholder="Duration"
                                    value={exp.duration}
                                    onChange={(e) => {
                                        const newExperience = [...formData.experience];
                                        newExperience[index].duration = e.target.value;
                                        setFormData({ ...formData, experience: newExperience });
                                    }}
                                    className="w-full px-4 text-[18px] py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-transparent transition duration-300"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeExperience(index)}
                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-200 transform hover:scale-105"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addExperience}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-500 transform hover:scale-105"
                        >
                            Add More Experience
                        </button>
                    </div>

                    <div className="flex gap-4 justify-center mt-8">
                        <PDFDownloadLink
                            document={<CVDocument />}
                            fileName="cv.pdf"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition duration-200 transform hover:scale-105 flex items-center justify-center min-w-[200px]"
                        >
                            {loading ? 'Generating PDF...' : 'Download CV'}
                        </PDFDownloadLink>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CVBuilder;/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
<p>Don&apos;t forget to save</p>
