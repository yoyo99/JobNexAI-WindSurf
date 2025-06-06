// Nécessite EmailJS (https://www.emailjs.com/) :
// 1. Installer emailjs-com : npm install emailjs-com
// 2. Créer un service, un template et utiliser l'user ID fournis par EmailJS
// 3. Configurer le template pour envoyer à boltsaas01@gmail.com

import { useState } from 'react'
import emailjs from 'emailjs-com'

interface FeedbackModalProps {
  open: boolean
  onClose: () => void
}

export function FeedbackModal({ open, onClose }: FeedbackModalProps) {
  const [type, setType] = useState<'bug' | 'idea'>('bug')
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      // Remplacez ces valeurs par celles de votre compte EmailJS
      // À compléter avec vos identifiants EmailJS
      const SERVICE_ID = 'service_mua4t0l';
      const TEMPLATE_ID = 'template_7fpilue';
      const PUBLIC_KEY = 'O0LnolTBPNqbejzhl';
      const templateParams = {
        type,
        message,
        email,
      };
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      setSent(true)
    } catch (err) {
      setError("Erreur lors de l'envoi. Veuillez réessayer.")
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
          onClick={onClose}
          aria-label="Fermer"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4 text-gray-900">Remonter un bug ou une idée</h2>
        {sent ? (
          <div className="text-green-600 text-center font-semibold">
            Merci pour votre retour !
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="type"
                  value="bug"
                  checked={type === 'bug'}
                  onChange={() => setType('bug')}
                />
                Bug
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="type"
                  value="idea"
                  checked={type === 'idea'}
                  onChange={() => setType('idea')}
                />
                Idée
              </label>
            </div>
            <div>
              <textarea
                className="w-full border rounded p-2 min-h-[80px]"
                placeholder={type === 'bug' ? 'Décrivez le bug rencontré...' : 'Décrivez votre idée...'}
                value={message}
                required
                onChange={e => setMessage(e.target.value)}
              />
            </div>
            <div>
              <input
                className="w-full border rounded p-2"
                type="email"
                placeholder="Votre email (optionnel)"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            {error && <div className="text-red-600 text-sm">{error}</div>}
            <button
              type="submit"
              className="btn-primary w-full"
              disabled={loading}
            >
              {loading ? 'Envoi...' : 'Envoyer'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
