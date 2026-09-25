import React from 'react';
import { Modal } from './Modal';
import { useApp } from '../../context/AppContext';
import { Check, ShieldCheck, BookOpen, Sparkles, User } from 'lucide-react';
import { UserRole } from '../../types';

interface UserSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserSwitcherModal: React.FC<UserSwitcherModalProps> = ({ isOpen, onClose }) => {
  const { availableUsers, activeUser, setActiveUser } = useApp();

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'sacerdote':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-900 border border-amber-300">
            <ShieldCheck className="w-3 h-3 mr-1 text-amber-700" /> Sacerdote
          </span>
        );
      case 'coordinador':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-900 border border-blue-200">
            <Sparkles className="w-3 h-3 mr-1 text-blue-600" /> Coordinador
          </span>
        );
      case 'estudiante':
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-stone-100 text-stone-700 border border-stone-300">
            <BookOpen className="w-3 h-3 mr-1 text-stone-500" /> Estudiante
          </span>
        );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Cambiar Perfil Activo"
      subtitle="Interactúa en el sistema adoptando el rol de estudiante, sacerdote tutor o coordinador"
      maxWidth="md"
    >
      <div className="space-y-3">
        {availableUsers.map((u) => {
          const isSelected = u.id === activeUser.id;
          return (
            <div
              key={u.id}
              onClick={() => {
                setActiveUser(u);
                onClose();
              }}
              className={`flex items-center justify-between p-3.5 rounded-xl cursor-pointer border transition-all ${
                isSelected
                  ? 'border-amber-600 bg-amber-50/60 shadow-xs'
                  : 'border-stone-200 hover:border-amber-300 hover:bg-stone-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={u.avatar}
                    alt={u.name}
                    className="w-11 h-11 rounded-full object-cover border border-stone-200 shadow-2xs"
                  />
                  {isSelected && (
                    <span className="absolute -top-1 -right-1 bg-amber-700 text-white rounded-full p-0.5">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-stone-900 text-sm">{u.name}</span>
                    {getRoleBadge(u.role)}
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5">{u.locality} • {u.generation}</p>
                  {u.bio && <p className="text-[11px] text-stone-600 italic mt-1 line-clamp-1">{u.bio}</p>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};
