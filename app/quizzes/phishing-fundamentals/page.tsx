import { Metadata } from 'next';
import Link from 'next/link';
import QuizEngine from '@/components/QuizEngine';

export const metadata: Metadata = {
  title: 'Phishing Detection Fundamentals Quiz | Zentrion Academy',
  description: 'Test your ability to spot malicious emails, spoofed domains, and social engineering tactics.',
};

const quizData = {
  quizId: 'phishing-fundamentals',
  title: 'Phishing Detection Fundamentals',
  description: 'A 5-question assessment on identifying common phishing vectors and social engineering techniques.',
  questions: [
    {
      id: 'q1',
      text: 'You receive an urgent email from "Security@PayPaI.com" (notice the capital "i" instead of "L") stating your account is locked. What type of attack is this?',
      options: [
        { id: 'a', text: 'SQL Injection' },
        { id: 'b', text: 'Homoglyph Attack (Typosquatting)' },
        { id: 'c', text: 'Cross-Site Scripting (XSS)' },
        { id: 'd', text: 'Man-in-the-Middle (MitM)' },
      ],
      correctOptionId: 'b',
      explanation: 'A Homoglyph attack uses characters that look visually similar (like an uppercase I and a lowercase l) to trick users into trusting a malicious domain.',
    },
    {
      id: 'q2',
      text: 'Which of the following email headers provides the MOST reliable proof of who actually sent the email?',
      options: [
        { id: 'a', text: 'From:' },
        { id: 'b', text: 'Reply-To:' },
        { id: 'c', text: 'Return-Path:' },
        { id: 'd', text: 'Subject:' },
      ],
      correctOptionId: 'c',
      explanation: 'The Return-Path (or Envelope Sender) is used by mail servers to route bounces and is much harder to spoof effectively than the "From:" header, especially when combined with SPF/DKIM checks.',
    },
    {
      id: 'q3',
      text: 'An attacker calls the IT helpdesk pretending to be a new employee who forgot their password. What technique is this?',
      options: [
        { id: 'a', text: 'Spear Phishing' },
        { id: 'b', text: 'Vishing (Voice Phishing)' },
        { id: 'c', text: 'Whaling' },
        { id: 'd', text: 'Baiting' },
      ],
      correctOptionId: 'b',
      explanation: 'Vishing (Voice Phishing) occurs when an attacker uses a phone call to manipulate victims into revealing sensitive information or performing actions.',
    },
    {
      id: 'q4',
      text: 'What does a legitimate URL starting with "HTTPS" guarantee?',
      options: [
        { id: 'a', text: 'The website is safe and not malicious.' },
        { id: 'b', text: 'The connection between you and the website is encrypted.' },
        { id: 'c', text: 'The website is owned by a verified corporation.' },
        { id: 'd', text: 'The website cannot be taken down by authorities.' },
      ],
      correctOptionId: 'b',
      explanation: 'HTTPS only guarantees that the traffic between your browser and the server is encrypted. Anyone, including attackers, can obtain a free SSL certificate for a malicious website.',
    },
    {
      id: 'q5',
      text: 'You are asked to review a suspicious link: "http://secure-login.com.google-update.net/login". What is the actual domain registered by the owner?',
      options: [
        { id: 'a', text: 'secure-login.com' },
        { id: 'b', text: 'google-update.net' },
        { id: 'c', text: 'google.com' },
        { id: 'd', text: 'login.com' },
      ],
      correctOptionId: 'b',
      explanation: 'The top-level domain and second-level domain combined define the registered domain. In this case, "google-update.net" is the actual domain; everything before it is just a subdomain.',
    },
  ],
};

export default function PhishingQuizPage() {
  return (
    <div className="pt-32 pb-24 container-x min-h-screen">
      <nav className="flex items-center gap-2 text-sm text-[rgb(var(--c-mute))] mb-8">
        <Link href="/" className="hover:text-[rgb(var(--c-ink))] transition-colors">Home</Link>
        <span>/</span>
        <Link href="/quizzes" className="hover:text-[rgb(var(--c-ink))] transition-colors">Quizzes</Link>
        <span>/</span>
        <span className="text-[rgb(var(--c-ink))] truncate">{quizData.title}</span>
      </nav>

      <QuizEngine {...quizData} />
    </div>
  );
}
