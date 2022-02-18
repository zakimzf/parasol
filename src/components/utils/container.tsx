type ContainerProps = {
	children: React.ReactNode,
	fluid?: boolean
	// className: React.Attributes
};

const Container = function ({children, fluid}: ContainerProps) {
	return (<div className={`mx-auto ${fluid ? 'px-20' : 'max-w-7xl'} px-5 `}>{children}</div>)
}

export default Container;
