// ** Icon imports

import HomeOutline from 'mdi-material-ui/HomeOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import  CogOutline  from 'mdi-material-ui/CogOutline'
import { ArchiveAlertOutline, ArchiveClockOutline, ArchiveEditOutline, ArchiveOffOutline, ArchiveOutline, ArchivePlusOutline, PlaylistEdit, PlaylistPlus, SwapVertical } from 'mdi-material-ui/'

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
      path: '/assets'
    },
    {
      title: 'Register',
      icon: ArchivePlusOutline,
      path: '/register'
    },
    {
      title: 'Update',
      icon: ArchiveEditOutline,
      path: '/update'
    },
    {
      title: 'Maintenance',
      icon: ArchiveAlertOutline,
      path: '/maintenance'
    },
    {
      title: 'Dispose',
      icon: ArchiveOffOutline,
      path: '/dispose'
    },
    {
      title: 'Transfer',
      icon: SwapVertical,
      path: '/transfer'
    },
    {
      title: 'History',
      icon: ArchiveClockOutline,
      path: '/history'
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
