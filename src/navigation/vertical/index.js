// ** Icon imports

import HomeOutline from 'mdi-material-ui/HomeOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import  CogOutline  from 'mdi-material-ui/CogOutline'
import { ArchiveAlertOutline, ArchiveClockOutline, ArchiveEditOutline, ArchiveOffOutline, ArchiveOutline, ArchivePlusOutline, PlaylistEdit, PlaylistPlus } from 'mdi-material-ui/'

const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      sectionTitle: 'Asset Management'
    },
    {
      title: 'Assets',
      icon: ArchiveOutline,
      path: '/pages/assets',
      openInNewTab: true
    },
    {
      title: 'Register',
      icon: ArchivePlusOutline,
      path: '/pages/register',
      openInNewTab: true
    },
    {
      title: 'Update',
      icon: ArchiveEditOutline,
      path: '/pages/update',
      openInNewTab: true
    },
    {
      title: 'Maintenance',
      icon: ArchiveAlertOutline,
      path: '/pages/maintenance',
      openInNewTab: true
    },
    {
      title: 'Dispose',
      icon: ArchiveOffOutline,
      path: '/pages/dispose',
      openInNewTab: true
    },
    {
      title: 'Transfer',
      icon: AlertCircleOutline,
      path: '/pages/transfer',
      openInNewTab: true
    },
    {
      title: 'History',
      icon: ArchiveClockOutline,
      path: '/pages/history',
      openInNewTab: true
    },
    {
      sectionTitle: 'Category Management'
    },
    {
      title: 'Register Category',
      icon: PlaylistPlus,
      path: '/register-category'
    },
    {
      title: 'Update Details',
      path: '/update-category',
      icon: PlaylistEdit
    },
    {
      sectionTitle: 'Contract Management'
    },
    {
      title: 'Settings',
      icon: CogOutline,
      path: '/settings'
    }
  ]
}

export default navigation
