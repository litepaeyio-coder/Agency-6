import React, { useEffect, useState } from 'react';
import { getAll } from '../services/firebaseService';
import { Link } from 'react-router-dom';

export default function AgencyPortfolio() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { (async () => {
      setProjects(await getAll('projects'));
      setLoading(false);
  })(); }, []);

  return (
    <main className="font-inter">
      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 to-blue-400 text-white text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">CreativeHub</h1>
        <p className="max-w-xl text-lg md:text-2xl mb-8">We craft video stories & socials that grow your brand.</p>
        <div className="space-x-4">
          <a href="#contact" className="px-6 py-3 rounded-xl bg-white text-blue-600 font-semibold shadow-lg hover:scale-105 transition">Get in Touch</a>
          <a href="#portfolio" className="px-6 py-3 rounded-xl bg-transparent border border-white font-semibold hover:bg-white hover:text-blue-600 transition">Our Work</a>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6 text-center">About Us</h2>
        <p className="text-lg max-w-3xl mx-auto mb-10 text-center">3+ years, 120+ projects, trusted by creators & brands worldwide.</p>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass p-8">
            <h3 className="text-4xl font-bold">120+</h3><p>Projects</p>
          </div>
          <div className="glass p-8">
            <h3 className="text-4xl font-bold">40</h3><p>Clients</p>
          </div>
          <div className="glass p-8">
            <h3 className="text-4xl font-bold">3</h3><p>Years in business</p>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="py-20 bg-gray-100">
        <h2 className="text-3xl font-bold mb-10 text-center">Portfolio</h2>
        {loading ? (
          <div className="skeleton h-32 w-full"></div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
            {projects.map(p => (
              <div key={p.id} className="relative group overflow-hidden rounded-xl shadow-lg">
                <img src={p.thumbnail} alt={p.title} loading="lazy" className="object-cover w-full h-60 transition-transform group-hover:scale-110"/>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                  <span className="text-white text-lg font-semibold">{p.title}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Services */}
      <section id="services" className="py-20 container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-10 text-center">Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {['Video Editing','Social Media Content','Reels/TikTok Shorts','Brand Strategy'].map(s=>(
            <div key={s} className="glass p-8 text-center hover:shadow-2xl transition">
              <h3 className="font-semibold text-xl mb-2">{s}</h3>
              <p>High-impact {s.toLowerCase()} that converts viewers to fans.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gray-100">
        <h2 className="text-3xl font-bold mb-10 text-center">Testimonials</h2>
        <Testimonials />
      </section>

      {/* Contact */}
      <ContactForm />

      <footer className="py-6 text-center text-sm bg-gray-200">&copy; {new Date().getFullYear()} CreativeHub. All rights reserved.</footer>
    </main>
  );
}

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  useEffect(() => { getAll('testimonials').then(setTestimonials); }, []);
  if (!testimonials.length) return <div className="skeleton h-32 w-full"></div>;
  return (
    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 px-6">
      {testimonials.map(t=>(
        <div key={t.id} className="glass p-6">
          <p className="mb-4">&ldquo;{t.message}&rdquo;</p>
          <div className="font-semibold">{t.name}</div>
        </div>
      ))}
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({name:'',email:'',message:''});
  const [sent, setSent] = useState(false);
  const handleChange = e => setForm({...form,[e.target.name]:e.target.value});
  const handleSubmit = async e => {
    e.preventDefault();
    if(form.name && form.email && form.message){
      await addItem('contacts',form);
      setSent(true);
    }
  };
  return (
    <section id="contact" className="py-20 container mx-auto px-6">
      <h2 className="text-3xl font-bold mb-10 text-center">Contact</h2>
      {sent ? (
        <p className="text-center text-xl text-blue-600">Thank you! We’ll reply shortly.</p>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto glass p-8 space-y-4">
          {['name','email','message'].map(f=>(
            <input
              key={f}
              type={f==='message'?'textarea':'text'}
              name={f}
              placeholder={f[0].toUpperCase()+f.slice(1)}
              value={form[f]}
              onChange={handleChange}
              required
              className="w-full p-3 rounded border focus:outline-none"
            />
          ))}
          <button className="w-full bg-blue-600 text-white py-3 rounded hover:opacity-90 transition">Send Message</button>
          <div className="text-center">
            or <a href="https://wa.me/1234567890" className="text-blue-600">WhatsApp us</a>
          </div>
        </form>
      )}
    </section>
  );
      }
