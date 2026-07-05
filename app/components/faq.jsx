'use client'

import React, { useState, useMemo } from 'react';
import {
  BsChevronDown,
  BsSearch,
  BsQuestionCircleFill
} from "react-icons/bs";

export const Faq = ({ data }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [openId, setOpenId] = useState(null);

  // Extract unique categories from FAQ data
  const categories = useMemo(() => {
    const cats = new Set(data.map(item => item.faqcat || 'General'));
    return ['All', ...Array.from(cats)];
  }, [data]);

  // Filter FAQs based on search query and selected category
  const filteredFaqs = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = 
        item.faqquestion.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.faqanswer.toLowerCase().includes(searchQuery.toLowerCase());
      
      const itemCat = item.faqcat || 'General';
      const matchesCategory = activeCategory === 'All' || itemCat === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [data, searchQuery, activeCategory]);

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="w-full max-w-[900px] mx-auto px-4 py-8">
      {/* Search and Filter Control Center */}
      <div className="mb-10 space-y-6">
        {/* Real-time Search Input */}
        <div className="relative max-w-xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <BsSearch className="text-slate-400 text-lg" />
          </div>
          <input
            id="faq-search-input"
            type="text"
            placeholder="Search questions, keywords, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-16 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-base"
          />
        </div>

        {/* Category Filter Badges */}
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveCategory(cat);
                setOpenId(null); // Reset open accordion on category change
              }}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide border cursor-pointer transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-blue-700 to-sky-600 text-white border-transparent shadow-md'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((item, i) => {
            const isOpen = openId === item.faqid;
            return (
              <div
                key={i}
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-sky-500 shadow-md ring-1 ring-sky-500/20'
                    : 'border-slate-100 shadow-sm hover:border-slate-200 hover:shadow'
                }`}
              >
                {/* Accordion Trigger Header */}
                <button
                  onClick={() => toggleFaq(item.faqid)}
                  className="w-full flex justify-between items-center text-left px-6 py-5 cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-4">
                    <BsQuestionCircleFill className={`text-xl flex-shrink-0 ${isOpen ? 'text-sky-500' : 'text-slate-400'}`} />
                    <span className="font-bold text-slate-800 text-base md:text-lg">
                      {item.faqquestion}
                    </span>
                  </div>
                  <BsChevronDown
                    className={`text-slate-500 text-base flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Accordion Answer Content */}
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-[1000px] border-t border-slate-150' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 py-5 bg-slate-50/50 text-slate-600 text-sm md:text-base leading-relaxed">
                    {item.faqanswer}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-slate-400 text-lg">No matching questions found.</p>
            <button 
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="mt-4 px-5 py-2 text-sky-600 hover:text-sky-700 font-semibold cursor-pointer"
            >
              Clear filters and search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
