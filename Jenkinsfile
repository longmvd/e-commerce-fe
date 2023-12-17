/* groovylint-disable Indentation */
/* groovylint-disable-next-line NglParseError */
pipeline {
    agent any
    stages {
        stage('Clone code') {
            steps {
                git branch: 'main', url: 'https://github.com/longmvd/e-commerce-fe.git'
            }
        }

        stage('Build and Push Docker Image') {
            steps {
                withDockerRegistry(credentialsId: 'docker-hub', url: 'https://index.docker.io/v1/') {
                    echo 'Building Docker image...'
                    sh 'docker build -t giadienanhkysi/ecommerce-frontend .'
                    echo 'Pushing Docker image to DockerHub...'
                    sh 'docker push giadienanhkysi/ecommerce-frontend'
                }
            }
        }

        stage('Deploy to remote server') {
            steps {
                script {
                    /* groovylint-disable-next-line NestedBlockDepth, SpaceAfterClosingBrace */
                    def remoteServer = '14.225.204.198'
                    def remoteUser = 'root'
                    def remoteDir = '/ecommerce-production'

                    // Start the SSH agent and add the credentials
                    sshagent(['ecommerce-server']) {
                        // SSH to the remote server and execute commands
                        sh """
                           ssh ${remoteUser}@${remoteServer} "cd ${remoteDir} && docker pull giadienanhkysi/ecommerce-frontend && docker-compose up -d"
                        """
                    }
                }
            }
        }
    }
}
