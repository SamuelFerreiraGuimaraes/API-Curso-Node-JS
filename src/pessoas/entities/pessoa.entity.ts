import { IsEmail } from 'class-validator';
import { Note } from 'src/notes/entities/notes.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Pessoa {
  // Definindo o ID como chave primária
  @PrimaryGeneratedColumn()
  id: number;

  // Definindo as colunas da tabela
  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 255 })
  PassHash: string;

  // Relacionamento de um para muitos
  @OneToMany(() => Note, (note) => note.sender) // Um para muitos
  NotesSend: Note[]; // Nome do relacionamento

  @OneToMany(() => Note, (note) => note.receiver) // Um para muitos
  NotesReceive: Note[]; // Nome do relacionamento

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
