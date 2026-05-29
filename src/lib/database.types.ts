export type UserRole = 'professor' | 'aluno';
export type BeltType = 'branca' | 'cinza' | 'amarela' | 'laranja' | 'verde' | 'azul' | 'roxa' | 'marrom' | 'preta';
export type PaymentStatusType = 'pendente' | 'pago' | 'atrasado';
export type ModalityType = 'bjj-adultos' | 'bjj-kids' | 'defesa-pessoal' | 'open-mat';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          role: UserRole;
          name: string;
          email: string;
          phone: string | null;
          birth_date: string | null;
          belt: BeltType;
          stripes: number;
          plan_id: string | null;
          enrollment_date: string | null;
          active: boolean;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      plans: {
        Row: {
          id: string;
          name: string;
          price: number;
          frequency: string;
          description: string | null;
          active: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['plans']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['plans']['Insert']>;
      };
      schedules: {
        Row: {
          id: string;
          day_of_week: number;
          time: string;
          duration: number;
          modality: ModalityType;
          instructor: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['schedules']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['schedules']['Insert']>;
      };
      graduation_rules: {
        Row: {
          id: string;
          from_belt: BeltType;
          to_belt: BeltType;
          min_months: number;
          min_classes: number;
          requirements: string | null;
          notes: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['graduation_rules']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['graduation_rules']['Insert']>;
      };
      payments: {
        Row: {
          id: string;
          student_id: string;
          plan_id: string | null;
          amount: number;
          due_date: string;
          paid_date: string | null;
          status: PaymentStatusType;
          notes: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['payments']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['payments']['Insert']>;
      };
      attendance: {
        Row: {
          id: string;
          student_id: string;
          schedule_id: string | null;
          date: string;
          notes: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['attendance']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['attendance']['Insert']>;
      };
    };
  };
}

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Plan = Database['public']['Tables']['plans']['Row'];
export type Schedule = Database['public']['Tables']['schedules']['Row'];
export type GraduationRule = Database['public']['Tables']['graduation_rules']['Row'];
export type Payment = Database['public']['Tables']['payments']['Row'];
export type Attendance = Database['public']['Tables']['attendance']['Row'];
