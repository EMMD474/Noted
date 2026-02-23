import Heading from '@/components/Heading'
import React from 'react'
import { FileOpen, FileDownloadOutlined, FileUploadOutlined } from '@mui/icons-material'
import { Box } from '@mui/material'
import CommingSoon from '@/components/CommingSoon'

const MarkdownFiles = () => {
    const upCommingFeatures = [
        {
            title: "Markdown Editor",
            description: "Write and edit markdown files",
            icon: <FileOpen sx={{ fontSize: 20 }} />
        },
        {
            title: "Markdown Import and Export",
            description: "Import markdwon files for edit and export to different file types e.g otd",
            icon: <FileDownloadOutlined sx={{ fontSize: 20 }}  />
        },
        {
            title: "Markdown Import and Export",
            description: "Import markdwon files for edit and export to different file types e.g otd",
            icon: <FileUploadOutlined sx={{ fontSize: 20 }}  />
        }
    ]

  return (
    <Box>
      <Heading title="Markdown" description="View your Markdown files" icon={<FileOpen sx={{ color: "white", fontSize: 24 }} />} />

      {/* comming soon */}
      <CommingSoon upCommingFeatures={upCommingFeatures} />
    </Box>
  )
}

export default MarkdownFiles