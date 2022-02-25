import Container from "../container";
import {people} from "../../constants";
import Image from 'next/image';

export default () =>
	<section>
		<Container>
			<ul
				role="list"
				className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 md:gap-x-6 lg:gap-x-8 lg:gap-y-12 xl:grid-cols-6">
				{people.map((person) => <li key={person.name}>
					<div className="space-y-4 text-center">
						<Image className="mx-auto w-6 rounded-full" src={person.picture} alt=""/>
						<div className="space-y-2">
							<div className="text-xs font-medium lg:text-sm">
								<h3>{person.name}</h3>
								<p className="text-purple-2">{person.role}</p>
							</div>
						</div>
					</div>
				</li>)}
			</ul>
		</Container>
	</section>
