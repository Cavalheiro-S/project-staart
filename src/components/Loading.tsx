
export const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full h-[90vh]">
            <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-primary"></div>
            <div className="text-primary mt-4">Carregando...</div>
        </div>
    )
}