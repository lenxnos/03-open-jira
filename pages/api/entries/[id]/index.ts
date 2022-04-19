import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../database';
import { Entry, IEntry } from '../../../../models';
import mongoose, { Error } from 'mongoose';

type Data = 
| { message: string }
| IEntry[]
| IEntry;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) { 
  switch(req.method) {
    case 'GET':
      return getEntry(req, res);
    case 'PUT':
      return updateEntry(req, res);
    default:
      return res.status(400).json({ message: 'Endpoint no existe' });
  }
}

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  try {
    await db.connect();
    const entry = await Entry.findById(id);
    await db.disconnect();
    if (!entry) {
      return res.status(404).json({ message: 'No se encontro la entrada' });
    }
    return res.status(200).json(entry);
  } catch(error) {
    await db.disconnect();
    return res.status(500).json({ message: 'Error al obtener entrada' });
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  try {
    await db.connect();
    const entryToUpdate = await Entry.findById(id);
    if (!entryToUpdate) {
      await db.disconnect();
      return res.status(404).json({ message: 'No se encontro la entrada' });
    }
    const { status = entryToUpdate.status, description = entryToUpdate.description } = req.body;
    const updateEntry = await Entry.findByIdAndUpdate(id, { status, description }, { new: true, runValidators: true });
    await db.disconnect();
    return res.status(201).json(updateEntry!);
  } catch(error) {
    await db.disconnect();
    if (error instanceof Error.ValidationError) {
      const { kind, path, value } = error.errors.status;
      if (kind === 'enum' && path === 'status') {
        return res.status(400).json({ message: `El estado ${value}, no es estado valido` });
      }
      return res.status(400).json({ message: 'Error de validacion' });
    }
    return res.status(500).json({ message: 'Error al crear entrada' });
  }
}