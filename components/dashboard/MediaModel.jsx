"use client"

import React, { useEffect, useRef, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { BookImage, ImagePlus, Loader2, Plus } from 'lucide-react'
import { IKImage, IKUpload } from 'imagekitio-next'
import { getAllMediaData, uploadToMedia } from '@/lib/actions/dbFunctions'
import { handleStatus } from '@/lib/handler'

function MediaModel({ selectedMedia }) {
    const [open, setOpen] = useState(false)
    const [medias, setMedias] = useState(null)
    const [isUploading, setIsUploading] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const ikCustomUploadBtn = useRef(null)
    useEffect(() => {
        async function fetchMedia() {
            setIsLoading(true)
            const { status, data: mediaData } = await getAllMediaData()
            handleStatus(status)
            setMedias(mediaData)
            setIsLoading(false)
        }
        if (open) {
            fetchMedia()
        }
    }, [open])

    async function handleUploadSuccess(res) {
        const { fileId, name, filePath, thumbnailUrl, url } = res
        const { status, data } = await uploadToMedia(fileId, name, filePath, thumbnailUrl, url)
        handleStatus(status)
        setIsUploading(false)
        if (data) {
            selectedMedia(data)
        }
    }
    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="secondary" className="flex flex-col items-center justify-center gap-1 p-5 h-20">
                        <ImagePlus size={70}/>
                        <p className='text-center heading-3'>Upload media</p>
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Select from media</DialogTitle>
                        <DialogDescription>choice from the uploaded medias or upload new one</DialogDescription>
                    </DialogHeader>
                    <div className='h-fit'>
                        <div className='w-full flex justify-between'>
                            <h3 className='heading-3'>Media</h3>
                            <IKUpload
                                fileName="test-upload.png"
                                onError={(error) => { throw error }}
                                validateFile={(file) => file.size < 4000000}
                                onSuccess={handleUploadSuccess}
                                onUploadStart={() => setIsUploading(true)}
                                ref={ikCustomUploadBtn}
                                className='hidden'
                            />
                            {ikCustomUploadBtn && (
                                <Button disabled={isUploading} onClick={() => ikCustomUploadBtn.current.click()}>
                                    {isUploading ? (
                                        <Loader2 className='animate-spin' />
                                    ) : (
                                        "Upload (max 4MB)"
                                    )}
                                </Button>
                            )}
                        </div>
                        <div className='p-3 h-fit'>
                            {isLoading ? (
                                <div className="size-full flex items-center justify-center">
                                    <Loader2 className="animate-spin" />
                                </div>
                            ) : (
                                medias && medias.length > 0 ? (
                                    <div className='grid grid-cols-3 gap-2 border border-gray-500 h-fit'>
                                        {medias?.map((img) => (
                                            <Button key={img.id} variant="ghost" className="size-fit" onClick={() => { selectedMedia(img) }}>
                                                <IKImage path={img.filePath} width={400} height={300} alt={img.name} className='object-cover w-auto h-[110px]' />
                                            </Button>
                                        ))}
                                    </div>
                                ) : (
                                    <div className='flex flex-col gap-4 items-center justify-center'>
                                        <BookImage size={100} />
                                        <h3 className='heading-2'>Media is Empty upload to use it</h3>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default MediaModel