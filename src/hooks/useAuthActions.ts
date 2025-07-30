
// @ts-nocheck
import { supabase } from '@/integrations/supabase/client';
import { secureLog } from '@/utils/basicSecurity';
import { useToast } from '@/hooks/use-toast';

export function useAuthActions() {
  const { toast } = useToast();

  const signUp = async (email: string, password: string, firstName?: string, lastName?: string) => {
    try {
      if (!email || !email.includes('@')) {
        return { error: { message: 'Email invalide détecté' } };
      }

      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            first_name: firstName,
            last_name: lastName
          }
        }
      });

      if (error) {
        secureLog.warn('Signup failed', { email, error: error.message });
        toast({
          variant: "destructive",
          title: "Erreur lors de l'inscription",
          description: error.message
        });
        return { error };
      }

      toast({
        title: "Inscription réussie",
        description: "Vérifiez votre email pour confirmer votre compte."
      });

      return { data: { user: null } };
    } catch (error) {
      secureLog.error('Signup error', error);
      return { error: { message: 'Erreur lors de l\'inscription' } };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      if (!email || !email.includes('@')) {
        return { error: { message: 'Email invalide' } };
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        secureLog.warn('Login failed', { email, error: error.message });
        toast({
          variant: "destructive",
          title: "Erreur de connexion",
          description: error.message
        });
        return { error };
      }

      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur Dalil.dz"
      });

      return { data };
    } catch (error) {
      secureLog.error('Login error', error);
      return { error: { message: 'Erreur de connexion' } };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Erreur de déconnexion",
          description: error.message
        });
        return { error };
      }

      toast({
        title: "Déconnexion réussie",
        description: "À bientôt sur Dalil.dz"
      });

      return { error: null };
    } catch (error) {
      secureLog.error('Logout error', error);
      return { error: { message: 'Erreur de déconnexion' } };
    }
  };

  const resetPassword = async (email: string) => {
    try {
      if (!email || !email.includes('@')) {
        return { error: { message: 'Email invalide' } };
      }

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: error.message
        });
        return { error };
      }

      toast({
        title: "Email envoyé",
        description: "Vérifiez votre boîte mail pour réinitialiser votre mot de passe."
      });

      return { error: null };
    } catch (error) {
      secureLog.error('Password reset error', error);
      return { error: { message: 'Erreur lors de la réinitialisation' } };
    }
  };

  const updateProfile = async (updates: Record<string, unknown>) => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: updates
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Erreur de mise à jour",
          description: error.message
        });
        return { error };
      }

      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été mises à jour avec succès."
      });

      return { error: null };
    } catch (error) {
      secureLog.error('Profile update error', error);
      return { error: { message: 'Erreur de mise à jour du profil' } };
    }
  };

  return {
    signUp,
    signIn,
    signOut,
    resetPassword,
    updateProfile
  };
}
