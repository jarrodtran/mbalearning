import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const modulesDirectory = path.join(process.cwd(), 'content/modules');

export type ModuleMetadata = {
  slug: string;
  title: string;
  module: number;
  school: string;
  description: string;
};

export function getSortedModulesData(): ModuleMetadata[] {
  // Get file names under /content/modules
  const fileNames = fs.readdirSync(modulesDirectory);
  
  const allModulesData = fileNames.map((fileName) => {
    // Read mdx file as string
    const fullPath = path.join(modulesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      ...(matterResult.data as Omit<ModuleMetadata, 'slug'>),
      slug: matterResult.data.slug || fileName.replace(/\.mdx$/, ''),
    };
  });

  // Sort modules by module number
  return allModulesData.sort((a, b) => {
    if (a.module < b.module) {
      return -1;
    } else {
      return 1;
    }
  });
}

export function getModuleData(slug: string) {
  const fullPath = path.join(modulesDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  return {
    slug,
    content: matterResult.content,
    ...(matterResult.data as Omit<ModuleMetadata, 'slug'>),
  };
}
