"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Edit2, Camera, Mail, Key, User, Shield, BookOpen, CheckCircle, Award, Clock, GraduationCap, Lock, User as UserIcon, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useEditPasswordMutation, useEditProfileMutation, useUpdateAvatarMutation } from '@/redux/features/user/userApi';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

type UpdateSection = 'profile' | 'password' | null;

const Profile: React.FC = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [activeSection, setActiveSection] = useState<UpdateSection>(null);
  const [loading, setLoading] = useState(false);
  const [loadUser, setloadUser] = useState(false);
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const { } = useLoadUserQuery(undefined, { skip: !loadUser });
  const [EditProfile, { isSuccess: success, error: updateError }] = useEditProfileMutation();
  const [EditPassword, { isSuccess: PasswordSuccess, error: passwordError }] = useEditPasswordMutation();

  const [updateName, setUpdateName] = useState({
    name: user?.name || "",
    email: user?.email,
  });
  const [updatePassword, setUpdatePassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const { scrollY } = useScroll();
  const bannerScale = useTransform(scrollY, [0, 400], [1, 0.95]);
  const bannerY = useTransform(scrollY, [0, 400], [0, -50]);
  const imageScale = useTransform(scrollY, [0, 400], [1, 0.9]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0.7]);
  const contentY = useTransform(scrollY, [0, 400], [0, 40]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result
        updateAvatar(
          avatar
        )
      }
    }
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
    toast.success("Profile picture updated successfully!");
  };

  useEffect(() => {
    if (isSuccess || success) {
      setloadUser(true)
    }
    if (error || updateError) {
      console.log(error);
    }

    if (PasswordSuccess) {
      toast.success("Password updated successfully");
    }

    if (passwordError) {
      const err = passwordError as any;
      toast.error(err.data.message);
    }
  }, [isSuccess, error, success, updateError, PasswordSuccess, passwordError])

  const handleNameChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (updateName.name !== "") {
      EditProfile({
        name: updateName.name
      })
    }
    toast.success("Username updated successfully");
    setLoading(false);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    console.log(updatePassword);
    e.preventDefault();
    setLoading(true);

    if (updatePassword.confirmPassword === updatePassword.newPassword) {
      EditPassword({
        oldPassword: updatePassword.currentPassword,
        newPassword: updatePassword.newPassword
      })
    }
    else {
      toast.error("Password do not match");
    }

    setLoading(false);
  };

  const renderUpdateSection = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <form onSubmit={handleNameChange} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={updateName.name}
                onChange={(e) => setUpdateName({ ...updateName, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 dark:bg-gray-900"
              />
            </div>
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setActiveSection(null)}
                className="px-6 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        );
      case 'password':
        return (
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Current Password
              </label>
              <input
                type="password"
                required
                value={updatePassword.currentPassword}
                onChange={(e) => setUpdatePassword({ ...updatePassword, currentPassword: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 dark:bg-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                New Password
              </label>
              <input
                type="password"
                required
                value={updatePassword.newPassword}
                onChange={(e) => setUpdatePassword({ ...updatePassword, newPassword: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 dark:bg-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                value={updatePassword.confirmPassword}
                onChange={(e) => setUpdatePassword({ ...updatePassword, confirmPassword: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 dark:bg-gray-900"
              />
            </div>
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Update Password
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setActiveSection(null)}
                className="px-6 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        );
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setActiveSection('profile')}
              className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
            >
              <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
                <UserIcon className="w-6 h-6 text-blue-500" />
              </div>
              <div className="text-left">
                <h4 className="font-medium text-gray-900 dark:text-white">Update Profile</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Change your name</p>
              </div>
            </button>

            <button
              onClick={() => setActiveSection('password')}
              className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
            >
              <div className="p-3 bg-violet-50 dark:bg-violet-900/30 rounded-lg group-hover:bg-violet-100 dark:group-hover:bg-violet-900/50 transition-colors">
                <Lock className="w-6 h-6 text-violet-500" />
              </div>
              <div className="text-left">
                <h4 className="font-medium text-gray-900 dark:text-white">Change Password</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Update your password</p>
              </div>
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen py-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        {/* Profile Header */}
        <motion.div
          className="relative mb-8"
          style={{
            scale: bannerScale,
            y: bannerY,
            opacity
          }}
        >
          <div className="h-48 w-full rounded-2xl bg-gradient-to-r from-blue-600 via-violet-500 to-purple-500 relative overflow-hidden group">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute bottom-1/3 right-1/3 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse delay-300"></div>
              <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse delay-700"></div>
            </div>
          </div>

          {/* Profile Info Overlay */}
          <motion.div
            className="absolute -bottom-16 left-8 flex items-end gap-6"
            style={{ scale: imageScale }}
          >
            <div className="relative group">
              {user?.avatar ? (
                <Image
                  src={user.avatar.url || user.avatar}
                  alt="Profile"
                  width={140}
                  height={140}
                  className="rounded-2xl border-4 border-white dark:border-gray-800 shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105"
                />
              ) : (
                <Image
                  src="/images/profile.png"
                  alt="Profile"
                  width={140}
                  height={140}
                  className="rounded-2xl border-4 border-white dark:border-gray-800 shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105"
                />
              )}
              <label className="absolute bottom-2 right-2 p-2 bg-blue-500 rounded-xl text-white cursor-pointer hover:bg-blue-600 transition-all duration-300 hover:scale-110 shadow-lg">
                <Camera className="w-5 h-5" />
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>

              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-300"></div>
            </div>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-20"
          style={{ y: contentY }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Left Column - User Info */}
          <div className="space-y-6">
            {/* Basic Info Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user?.name}</h2>
                  <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
                </div>
                <button
                  onClick={() => setActiveSection('profile')}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Shield className="w-4 h-4 text-violet-500" />
                <span className="text-gray-600 dark:text-gray-400">{user?.role?.toUpperCase()}</span>

                <div className="flex items-center gap-1 text-green-500 ml-3">
                  <CheckCircle className="w-4 h-4" />
                  <span>Verified</span>
                </div>

              </div>
            </div>

            {user.role === "admin" && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 group">
                <Link href={"/admin"}>

                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-violet-500 text-transparent bg-clip-text group-hover:from-violet-500 group-hover:to-blue-600 transition-all duration-300">
                      Admin Dashboard
                    </h2>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                      Go to Admin Dashboard →
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
                    <Shield className="w-6 h-6 text-blue-500 transform group-hover:rotate-12 transition-transform" />
                  </div>
                </div>
                </Link>
              </div>
            )}

            {/* Stats Cards - Enhanced */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-xl group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
                    <GraduationCap className="w-6 h-6 text-blue-500 transform group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {user?.courses?.length || 0}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                  Enrolled Courses
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-green-50 dark:bg-green-900/30 rounded-xl group-hover:bg-green-100 dark:group-hover:bg-green-900/50 transition-colors">
                    <Award className="w-6 h-6 text-green-500 transform group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    4
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 group-hover:text-green-500 dark:group-hover:text-green-400 transition-colors">
                  Certificates
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Update Options & Activity */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                {activeSection ? (
                  activeSection === 'profile' ? 'Update Profile' : 'Change Password'
                ) : (
                  'Profile Settings'
                )}
              </h3>
              {renderUpdateSection()}
            </div>

            {!activeSection && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Recent Activity</h3>
                <div className="space-y-6">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
                    >
                      <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-xl group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
                        <Clock className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
                      </div>
                      <div>
                        <h4 className="text-gray-900 dark:text-white font-medium group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                          Completed Python Basics
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">2 hours ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;