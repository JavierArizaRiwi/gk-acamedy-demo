import mongoose from 'mongoose'; import * as bcrypt from 'bcryptjs';
const uri=process.env.MONGODB_URI||'mongodb://localhost:27017/gk_academy';
async function run(){await mongoose.connect(uri);const db=mongoose.connection.db!;await db.collection('plans').deleteMany({});await db.collection('plans').insertMany([
{name:'Plan Grupal',type:'GRUPAL',price:120000,currency:'COP',durationDays:30,sessionsPerMonth:8,features:['2 sesiones por semana','Trabajo técnico grupal','Seguimiento mensual'],active:true,description:'Entrenamiento técnico en grupo para mejorar fundamentos.'},
{name:'Plan Semipersonalizado',type:'SEMIPERSONALIZADO',price:190000,currency:'COP',durationDays:30,sessionsPerMonth:8,features:['Grupos reducidos','Correcciones individuales','Plan de progreso'],active:true,description:'Equilibrio entre atención individual y dinámica grupal.'},
{name:'Plan Personalizado',type:'PERSONALIZADO',price:320000,currency:'COP',durationDays:30,sessionsPerMonth:8,features:['Entrenamiento 1 a 1','Plan específico','Seguimiento prioritario'],active:true,description:'Entrenamiento totalmente adaptado al arquero.'}
]);await db.collection('services').deleteMany({});await db.collection('services').insertMany([
{name:'Alquiler de arquero',description:'Arquero disponible para acompañar tu partido, torneo o entrenamiento.',price:150000,currency:'COP',durationMinutes:90,active:true,order:1},
{name:'Evaluación técnica',description:'Diagnóstico individual de técnica, reflejos, ubicación y juego aéreo.',price:80000,currency:'COP',durationMinutes:60,active:true,order:2}
]);const email='admin@gkacademy.com';if(!(await db.collection('users').findOne({email}))){await db.collection('users').insertOne({name:'Administrador GK',email,passwordHash:await bcrypt.hash('Admin123*',12),role:'ADMIN',active:true,phone:'',createdAt:new Date(),updatedAt:new Date()});}console.log('Seed OK - admin@gkacademy.com / Admin123*');await mongoose.disconnect();}run();
