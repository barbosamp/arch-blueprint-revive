import { useState } from 'react';
import AlunoLayout from '@/components/aluno/AlunoLayout';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { BELT_COLORS, BELT_LABELS } from '@/types/painel';
import type { Belt } from '@/types/painel';

export default function AlunoPerfil() {
  const { profile, refreshProfile } = useAuth();
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  if (!profile) return null;

  const belt = profile.belt as Belt;
  const beltColor = BELT_COLORS[belt];
  const enrolledMonths = profile.enrollment_date
    ? Math.floor((Date.now() - new Date(profile.enrollment_date).getTime()) / (1000 * 60 * 60 * 24 * 30))
    : null;

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (newPw !== confirmPw) { setError('As senhas não coincidem.'); return; }
    if (newPw.length < 6) { setError('A nova senha deve ter ao menos 6 caracteres.'); return; }
    setSaving(true);
    const { error: signInErr } = await supabase.auth.signInWithPassword({
      email: profile.email,
      password: currentPw,
    });
    if (signInErr) { setError('Senha atual incorreta.'); setSaving(false); return; }
    const { error: updateErr } = await supabase.auth.updateUser({ password: newPw });
    if (updateErr) { setError('Erro ao atualizar senha. Tente novamente.'); setSaving(false); return; }
    setSuccess('Senha alterada com sucesso.');
    setCurrentPw('');
    setNewPw('');
    setConfirmPw('');
    setSaving(false);
    await refreshProfile();
  };

  return (
    <AlunoLayout>
      <div className="px-5 py-8 pb-24 md:pb-8 max-w-2xl mx-auto space-y-8">
        <div>
          <p className="font-mono text-[10px] tracking-[0.35em] text-gold uppercase mb-2">Configurações</p>
          <h1 className="font-display text-4xl text-white-belt tracking-wider">PERFIL</h1>
        </div>

        {/* Identity card */}
        <div className="bg-tatame border border-white/5 p-6 space-y-5">
          <p className="font-mono text-[9px] tracking-[0.3em] text-mid-gray/50 uppercase">Seus dados</p>
          <div>
            <p className="font-mono text-[8px] tracking-[0.25em] text-mid-gray uppercase mb-1">Nome</p>
            <p className="font-mono text-sm text-white-belt">{profile.name}</p>
          </div>
          <div>
            <p className="font-mono text-[8px] tracking-[0.25em] text-mid-gray uppercase mb-1">E-mail</p>
            <p className="font-mono text-sm text-white-belt">{profile.email}</p>
          </div>
          {profile.phone && (
            <div>
              <p className="font-mono text-[8px] tracking-[0.25em] text-mid-gray uppercase mb-1">Telefone</p>
              <p className="font-mono text-sm text-white-belt">{profile.phone}</p>
            </div>
          )}
          {profile.enrollment_date && (
            <div>
              <p className="font-mono text-[8px] tracking-[0.25em] text-mid-gray uppercase mb-1">Matrícula</p>
              <p className="font-mono text-sm text-white-belt">
                {new Date(profile.enrollment_date + 'T12:00:00').toLocaleDateString('pt-BR')}
                {enrolledMonths !== null && enrolledMonths > 0 && (
                  <span className="text-mid-gray/50 ml-2">({enrolledMonths} {enrolledMonths === 1 ? 'mês' : 'meses'})</span>
                )}
              </p>
            </div>
          )}
        </div>

        {/* Belt & graduation */}
        <div className="bg-tatame border border-white/5 p-6">
          <p className="font-mono text-[9px] tracking-[0.3em] text-mid-gray/50 uppercase mb-5">Graduação</p>
          <div className="flex items-center gap-6">
            <div>
              <div
                className="w-24 h-4 mb-2"
                style={{
                  backgroundColor: beltColor,
                  border: belt === 'preta' ? '1px solid #E8B84B' : 'none',
                }}
              />
              <div className="flex gap-1">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2.5 h-2.5"
                    style={{
                      backgroundColor: i < profile.stripes ? '#E8B84B' : 'transparent',
                      border: '1px solid rgba(232,184,75,0.3)',
                    }}
                  />
                ))}
              </div>
            </div>
            <div>
              <div className="font-display text-2xl text-white-belt tracking-wider capitalize">
                {BELT_LABELS[belt]}
              </div>
              <p className="font-mono text-[10px] text-mid-gray uppercase tracking-wider mt-0.5">
                {profile.stripes} {profile.stripes === 1 ? 'grau' : 'graus'}
              </p>
            </div>
          </div>
        </div>

        {/* Change password */}
        <div className="bg-tatame border border-white/5 p-6">
          <p className="font-mono text-[9px] tracking-[0.3em] text-mid-gray/50 uppercase mb-5">Alterar senha</p>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="font-mono text-[8px] tracking-[0.25em] text-gold uppercase block mb-1.5">
                Senha atual
              </label>
              <input
                type="password"
                value={currentPw}
                onChange={(e) => setCurrentPw(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-blackout border border-white/10 text-white-belt placeholder-mid-gray/30 px-4 py-3 font-mono text-sm focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>
            <div>
              <label className="font-mono text-[8px] tracking-[0.25em] text-gold uppercase block mb-1.5">
                Nova senha
              </label>
              <input
                type="password"
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full bg-blackout border border-white/10 text-white-belt placeholder-mid-gray/30 px-4 py-3 font-mono text-sm focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>
            <div>
              <label className="font-mono text-[8px] tracking-[0.25em] text-gold uppercase block mb-1.5">
                Confirmar nova senha
              </label>
              <input
                type="password"
                value={confirmPw}
                onChange={(e) => setConfirmPw(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-blackout border border-white/10 text-white-belt placeholder-mid-gray/30 px-4 py-3 font-mono text-sm focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>

            {error && (
              <p className="font-mono text-[9px] tracking-widest text-red-400">{error}</p>
            )}
            {success && (
              <p className="font-mono text-[9px] tracking-widest text-green-400">{success}</p>
            )}

            <button
              type="submit"
              disabled={saving}
              className="bg-gold text-blackout font-display text-base tracking-widest uppercase px-6 py-3 hover:bg-gold/90 transition-colors disabled:opacity-50"
            >
              {saving ? 'Salvando…' : 'Alterar senha'}
            </button>
          </form>
        </div>
      </div>
    </AlunoLayout>
  );
}
