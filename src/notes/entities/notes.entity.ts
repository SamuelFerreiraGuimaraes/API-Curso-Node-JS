import { Pessoa } from 'src/pessoas/entities/pessoa.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// Criando a entidade Note
@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'varchar', length: 100 })
  description: string;

  @ManyToOne(() => Pessoa, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }) // Muitos mensagens de uma unica pessoa
  @JoinColumn({ name: 'sender' }) // especifica que a coluna 'sender' vai armazenar uma informação de pessoa
  sender: Pessoa;

  @ManyToOne(() => Pessoa, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }) // Muitas mensagens para uma unica pessoa
  @JoinColumn({ name: 'receiver' })
  receiver: Pessoa;

  // Forma antiga

  /* @Column({ type: 'varchar', length: 100 })
  sender: string;

  @Column({ type: 'varchar', length: 100 })
  receiver: string; */

  @Column({ type: 'boolean', default: false })
  done: boolean;

  @CreateDateColumn({ type: 'date' })
  created_at?: Date;

  @UpdateDateColumn({ type: 'date' })
  updated_at?: Date;
}
