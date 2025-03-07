// src/api/team.js
import axios from 'axios';

const API_BASE = 'https://admin-api.ibibe.africa/';

export const fetchTeam = () => axios.get(`${API_BASE}team`);
export const addTeamMember = (memberData) => axios.post(`${API_BASE}team`, memberData);
export const updateTeamMember = (id, memberData) => axios.put(`${API_BASE}team/${id}`, memberData);
export const deleteTeamMember = (id) => axios.delete(`${API_BASE}team/${id}`);
