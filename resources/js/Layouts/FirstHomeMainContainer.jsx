import newHome from '@/assets/images/newHome.png'
import { motion } from 'motion/react'
export const FirstHomeMainContainer = () => {
    return (
        <div className='mt-8 pt-16 relative flex flex-wrap justify-around'>
            <motion.div className='w-responsive-width text-start custom-flex-wrap-first-title:text-center'
                        initial={{ opacity: 0, x: "-100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
            >
                <h1 className='text-responsive-h1 inline-block text-start custom-flex-wrap-first-title:text-center'>LA WEB QUE <span className="text-lilaPrincipal">MEJORA</span> TUS ENTRENAMIENTOS</h1>
                <h4 className='text-responsive-h4 inline-block pt-8 text-start custom-flex-wrap-first-title:text-center'>Maneja tu estilo de vida de la forma correcta con ayuda de expertos en el fitness</h4>
            </motion.div>
            <motion.div className='m-2 relative py-8 w-responsive-width'
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
            >
                <img className='opacity-70 mask-gradient h-responsive-height-first-image m-auto -my-20 custom-flex-wrap-first-title:my-0' src={newHome} alt='Healthy men' draggable="false"></img>
            </motion.div>
        </div>
    )
}
