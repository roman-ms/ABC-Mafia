export default function Header() {
    return <header className='flex flex-col lg:flex-row items-center justify-center gap-6 py-4 lg:pt-6 text-vermilion font-bold'>
        <img src="/logo.webp" width="150" className='max-w-[100px] lg:max-w-full' />
        <h1 className='font-display text-center text-2xl lg:text-4xl'>the Care Cubby Map</h1>
    </header>
}