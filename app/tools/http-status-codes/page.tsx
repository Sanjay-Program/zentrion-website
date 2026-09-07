'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

// Full list of HTTP Status Codes
const statusCodes = [
  // 1xx Informational
  { code: 100, phrase: "Continue", type: "1xx", description: "The server has received the request headers and the client should proceed to send the request body." },
  { code: 101, phrase: "Switching Protocols", type: "1xx", description: "The requester has asked the server to switch protocols and the server has agreed to do so." },
  { code: 102, phrase: "Processing", type: "1xx", description: "A WebDAV request may contain many sub-requests involving file operations, requiring a long time to complete." },
  { code: 103, phrase: "Early Hints", type: "1xx", description: "Used to return some response headers before final HTTP message." },

  // 2xx Success
  { code: 200, phrase: "OK", type: "2xx", description: "Standard response for successful HTTP requests." },
  { code: 201, phrase: "Created", type: "2xx", description: "The request has been fulfilled, resulting in the creation of a new resource." },
  { code: 202, phrase: "Accepted", type: "2xx", description: "The request has been accepted for processing, but the processing has not been completed." },
  { code: 203, phrase: "Non-Authoritative Information", type: "2xx", description: "The server is a transforming proxy that received a 200 OK from its origin, but is returning a modified version." },
  { code: 204, phrase: "No Content", type: "2xx", description: "The server successfully processed the request and is not returning any content." },
  { code: 205, phrase: "Reset Content", type: "2xx", description: "The server successfully processed the request, asks that the requester reset its document view, and is not returning any content." },
  { code: 206, phrase: "Partial Content", type: "2xx", description: "The server is delivering only part of the resource (byte serving) due to a range header sent by the client." },

  // 3xx Redirection
  { code: 300, phrase: "Multiple Choices", type: "3xx", description: "Indicates multiple options for the resource from which the client may choose." },
  { code: 301, phrase: "Moved Permanently", type: "3xx", description: "This and all future requests should be directed to the given URI." },
  { code: 302, phrase: "Found", type: "3xx", description: "Tells the client to look at (browse to) another URL. 302 has been superseded by 303 and 307." },
  { code: 303, phrase: "See Other", type: "3xx", description: "The response to the request can be found under another URI using the GET method." },
  { code: 304, phrase: "Not Modified", type: "3xx", description: "Indicates that the resource has not been modified since the version specified by the request headers If-Modified-Since or If-None-Match." },
  { code: 305, phrase: "Use Proxy", type: "3xx", description: "The requested resource is available only through a proxy, the address for which is provided in the response." },
  { code: 307, phrase: "Temporary Redirect", type: "3xx", description: "In this case, the request should be repeated with another URI; however, future requests should still use the original URI." },
  { code: 308, phrase: "Permanent Redirect", type: "3xx", description: "The request and all future requests should be repeated using another URI." },

  // 4xx Client Error
  { code: 400, phrase: "Bad Request", type: "4xx", description: "The server cannot or will not process the request due to an apparent client error." },
  { code: 401, phrase: "Unauthorized", type: "4xx", description: "Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet been provided." },
  { code: 402, phrase: "Payment Required", type: "4xx", description: "Reserved for future use. The original intention was that this code might be used as part of some form of digital cash or micropayment scheme." },
  { code: 403, phrase: "Forbidden", type: "4xx", description: "The request contained valid data and was understood by the server, but the server is refusing action." },
  { code: 404, phrase: "Not Found", type: "4xx", description: "The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible." },
  { code: 405, phrase: "Method Not Allowed", type: "4xx", description: "A request method is not supported for the requested resource." },
  { code: 406, phrase: "Not Acceptable", type: "4xx", description: "The requested resource is capable of generating only content not acceptable according to the Accept headers sent in the request." },
  { code: 407, phrase: "Proxy Authentication Required", type: "4xx", description: "The client must first authenticate itself with the proxy." },
  { code: 408, phrase: "Request Timeout", type: "4xx", description: "The server timed out waiting for the request." },
  { code: 409, phrase: "Conflict", type: "4xx", description: "Indicates that the request could not be processed because of conflict in the current state of the resource." },
  { code: 410, phrase: "Gone", type: "4xx", description: "Indicates that the resource requested is no longer available and will not be available again." },
  { code: 411, phrase: "Length Required", type: "4xx", description: "The request did not specify the length of its content, which is required by the requested resource." },
  { code: 412, phrase: "Precondition Failed", type: "4xx", description: "The server does not meet one of the preconditions that the requester put on the request header fields." },
  { code: 413, phrase: "Payload Too Large", type: "4xx", description: "The request is larger than the server is willing or able to process." },
  { code: 414, phrase: "URI Too Long", type: "4xx", description: "The URI provided was too long for the server to process." },
  { code: 415, phrase: "Unsupported Media Type", type: "4xx", description: "The request entity has a media type which the server or resource does not support." },
  { code: 418, phrase: "I'm a teapot", type: "4xx", description: "This code was defined in 1998 as one of the traditional IETF April Fools' jokes." },
  { code: 422, phrase: "Unprocessable Entity", type: "4xx", description: "The request was well-formed but was unable to be followed due to semantic errors." },
  { code: 429, phrase: "Too Many Requests", type: "4xx", description: "The user has sent too many requests in a given amount of time. Intended for use with rate-limiting schemes." },

  // 5xx Server Error
  { code: 500, phrase: "Internal Server Error", type: "5xx", description: "A generic error message, given when an unexpected condition was encountered and no more specific message is suitable." },
  { code: 501, phrase: "Not Implemented", type: "5xx", description: "The server either does not recognize the request method, or it lacks the ability to fulfill the request." },
  { code: 502, phrase: "Bad Gateway", type: "5xx", description: "The server was acting as a gateway or proxy and received an invalid response from the upstream server." },
  { code: 503, phrase: "Service Unavailable", type: "5xx", description: "The server cannot handle the request (because it is overloaded or down for maintenance)." },
  { code: 504, phrase: "Gateway Timeout", type: "5xx", description: "The server was acting as a gateway or proxy and did not receive a timely response from the upstream server." },
  { code: 505, phrase: "HTTP Version Not Supported", type: "5xx", description: "The server does not support the HTTP protocol version used in the request." },
];

export default function HttpStatusCodesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', '1xx', '2xx', '3xx', '4xx', '5xx'];

  const filteredCodes = useMemo(() => {
    return statusCodes.filter(status => {
      // Filter by type
      if (activeFilter !== 'All' && status.type !== activeFilter) {
        return false;
      }
      
      // Filter by search
      if (searchTerm) {
        const lowerSearch = searchTerm.toLowerCase();
        return (
          status.code.toString().includes(lowerSearch) ||
          status.phrase.toLowerCase().includes(lowerSearch) ||
          status.description.toLowerCase().includes(lowerSearch)
        );
      }
      
      return true;
    });
  }, [searchTerm, activeFilter]);

  const getColorForType = (type: string) => {
    switch (type) {
      case '1xx': return 'text-blue-400 border-blue-400/30 bg-blue-400/10';
      case '2xx': return 'text-green-400 border-green-400/30 bg-green-400/10';
      case '3xx': return 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10';
      case '4xx': return 'text-orange-400 border-orange-400/30 bg-orange-400/10';
      case '5xx': return 'text-red-400 border-red-400/30 bg-red-400/10';
      default: return 'text-white border-white/30 bg-white/10';
    }
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-10 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
              Developer Reference
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">HTTP Status Codes</h1>
            <p className="text-xl text-[rgb(var(--c-mute))] max-w-2xl">A complete, interactive cheat sheet for all standard HTTP network response codes.</p>
          </div>
          
          <div className="w-full sm:w-72">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-[rgb(var(--c-mute))]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <input
                type="text"
                placeholder="Search code or phrase..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-[rgba(255,255,255,0.1)] rounded-xl bg-[rgba(0,0,0,0.3)] text-white placeholder-[rgb(var(--c-mute))] focus:outline-none focus:border-[rgb(var(--c-accent))] focus:ring-1 focus:ring-[rgb(var(--c-accent))] sm:text-sm"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                activeFilter === filter 
                  ? 'bg-[rgb(var(--c-accent))] text-[rgb(var(--c-void))]' 
                  : 'bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-[rgb(var(--c-mute))] hover:text-white hover:bg-[rgba(255,255,255,0.1)]'
              }`}
            >
              {filter === 'All' ? 'All Codes' : filter}
            </button>
          ))}
        </div>

        {filteredCodes.length === 0 ? (
          <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md p-12 text-center">
            <svg className="mx-auto h-12 w-12 text-[rgb(var(--c-mute))] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <h3 className="text-xl font-bold text-white mb-2">No status codes found</h3>
            <p className="text-[rgb(var(--c-mute))]">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredCodes.map(status => (
              <div key={status.code} className="glass-card rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.04)] backdrop-blur-md p-6 flex flex-col transition-colors group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-display font-bold text-white">{status.code}</span>
                    <span className="text-lg font-bold text-[rgb(var(--c-mute))] group-hover:text-white transition-colors">{status.phrase}</span>
                  </div>
                  <div className={`text-xs font-bold px-2 py-1 rounded border ${getColorForType(status.type)} shrink-0`}>
                    {status.type}
                  </div>
                </div>
                <p className="text-[rgb(var(--c-mute))] text-sm leading-relaxed flex-grow">
                  {status.description}
                </p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
